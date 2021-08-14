from django.db.models.query import QuerySet
# from django.shortcuts import render
from rest_framework import status
from django.contrib.auth.hashers import make_password

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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
