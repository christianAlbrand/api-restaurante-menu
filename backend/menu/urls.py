from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlatilloViewSet

router = DefaultRouter()
router.register(r'platillos', PlatilloViewSet, basename='platillo')

urlpatterns = [
    path('', include(router.urls)),
]