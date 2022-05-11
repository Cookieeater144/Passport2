from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .serializers import *
from .views_auth import *

# Create your views here.

class TravelListViewSet(ModelViewSet):
    queryset = TravelList.objects.all()
    serializer_class = TravelListSerializer


    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)
        return super().perform_create(serializer)
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return TravelList.objects.all()
        return TravelList.objects.filter(creator=self.request.user)

class CountryViewSet(ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def get_queryset(self):
        return Country.objects.all()


class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method =="POST":
            return (permissions.AllowAny(),)
        return (permissions.IsAdminUser(),)
