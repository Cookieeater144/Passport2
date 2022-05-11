from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=64, unique=True)
    svg = models.CharField(max_length=255)

    def __str__(self):
        return f"NAME: {self.name}"

class TravelList(models.Model):
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=255, blank=True)
    creator = models.OneToOneField(User, on_delete=models.CASCADE, null=True, default=None, blank=True,related_name="travellistid")
    countrys = models.ManyToManyField(Country, blank=True, related_name="travellist")
    def __str__(self):
        return f"LIST: {self.name} CREATOR: {self.creator}"


    


