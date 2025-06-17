from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User

from .models import Promo, Product, GalleryImage
from .serializers import PromoSerializer, ProductSerializer, RegisterSerializer, GalleryImageSerializer

from .models import Testimonial
from .serializers import TestimonialSerializer

# Promo CRUD
class PromoViewSet(viewsets.ModelViewSet):
    queryset = Promo.objects.all().order_by('-start_date')
    serializer_class = PromoSerializer

# Product CRUD
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

# User Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Gallery Image CRUD
class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
