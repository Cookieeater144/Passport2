from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()


router.register("travel-lists", TravelListViewSet, basename="travel-list")
router.register("users", UserViewSet, basename="user")
router.register("countrys", CountryViewSet, basename="country")


urlpatterns = [
    path("", include(router.urls)),
    path("login/", handle_login),
    path("logout/", handle_logout),
]
