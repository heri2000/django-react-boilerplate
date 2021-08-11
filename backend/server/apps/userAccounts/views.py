from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from rest_framework import viewsets
from apps.userAccounts.serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def get_queryset(self):
        filter = self.request.GET['f']
        return self.queryset.filter(username__icontains=filter).order_by("username")
        