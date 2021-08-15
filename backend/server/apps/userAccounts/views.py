from django.core.exceptions import ValidationError
from django.db.models.query import QuerySet
# from django.shortcuts import render
from rest_framework import serializers, status
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView

# Create your views here.

from django.contrib.auth.models import User
from rest_framework import viewsets
from apps.userAccounts.serializers import UserSerializer
from apps.userAccounts.serializers import UserSerializerNoPassword
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def get_queryset(self):
        return self.queryset.order_by('username')
    
    def list(self, request):
        filter = request.GET['f']
        queryset = self.queryset.filter(username__icontains=filter).order_by('username')
        serializer = UserSerializerNoPassword(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        data = request.data
        password = make_password(data['password'], "", "pbkdf2_sha256")
        data['password'] = password
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            data['password'] = ""
            data['id'] = serializer.data['id']
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def partial_update(self, request, pk=None):
        data = User.objects.get(pk=pk)
        new_data = request.data
        if new_data['password'] == "":
            new_data['password'] = data.password
        else:
            password = make_password(new_data['password'], "", "pbkdf2_sha256")
            new_data['password'] = password
        serializer = UserSerializer(data, data=new_data)
        if (serializer.is_valid()):
            serializer.save()
            new_data['password'] = ""
            # return Response(serializer.data)
            return Response(new_data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserBulkAPI(APIView):
    queryset = User.objects.all()

    @classmethod
    def get_extra_actions(cls):
        return []

    def get_object(self, obj_id):
        try:
            return User.objects.get(id=obj_id)
        except:
            raise status.HTTP_400_BAD_REQUEST

    def validate_ids(self, id_list):
        for id in id_list:
            try:
                User.objects.get(id=id)
            except (User.DoesNotExist, ValidationError):
                raise status.HTTP_400_BAD_REQUEST
        return True
    
    def put(self, request, *args, **kwargs) :
        id_list = request.data['ids']
        field = request.data['field']
        value = request.data['value']
        self.validate_ids(id_list=id_list)
        instances = []
        for id in id_list:
            obj = self.get_object(obj_id=id)
            setattr(obj, field, value)
            obj.save()
            instances.append(obj)
        serializer = UserSerializerNoPassword(instances, many=True)
        return Response(serializer.data)