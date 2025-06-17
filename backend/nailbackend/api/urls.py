from django.urls import path, include
from rest_framework import routers
from .views import (
    PromoViewSet,
    ProductViewSet,
    RegisterView,
    GalleryImageViewSet,
    TestimonialViewSet,  
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'promo', PromoViewSet)
router.register(r'products', ProductViewSet)
router.register(r'gallery-images', GalleryImageViewSet)
router.register(r'testimonials', TestimonialViewSet) 

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
