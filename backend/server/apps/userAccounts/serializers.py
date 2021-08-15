# backend/server/apps/userAccounts/serializers.py

from django.contrib.auth import authenticate, get_user_model
from djoser.conf import settings
from djoser.serializers import TokenCreateSerializer

from rest_framework import serializers

User = get_user_model()

class CustomTokenCreateSerializer(TokenCreateSerializer):

    def validate(self, attrs):
        password = attrs.get("password")
        params = {settings.LOGIN_FIELD: attrs.get(settings.LOGIN_FIELD)}
        self.user = authenticate(
            request=self.context.get("request"), **params, password=password
        )
        if not self.user:
            self.user = User.objects.filter(**params).first()
            if self.user and not self.user.check_password(password):
                self.fail("invalid_credentials")
        # We changed only below line
        if self.user: # and self.user.is_active:
            return attrs
        self.fail("invalid_credentials")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ["id", "username", "first_name", "last_name", "password", "email", "is_staff", "is_superuser", "is_active", "date_joined", "last_login"]
        fields = '__all__'

class UserSerializerNoPassword(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "is_staff", "is_superuser", "is_active", "date_joined", "last_login"]