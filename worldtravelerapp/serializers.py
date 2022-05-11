from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *

class TravelListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TravelList
        fields = ['id', 'name', 'description', 'creator', 'countrys']

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'svg']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'travellistid', 'password']

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return super().create(validated_data)


