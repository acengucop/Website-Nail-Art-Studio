from django.urls import path, include
from rest_framework import routers
from .views import PromoViewSet
from .views import PromoViewSet, ProductViewSet  # Pastikan sudah di-import


router = routers.DefaultRouter()
router.register(r'promo', PromoViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
