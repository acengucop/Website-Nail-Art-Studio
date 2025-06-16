from rest_framework import viewsets, generics
from .models import Promo, Product
from .serializers import PromoSerializer, ProductSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class PromoViewSet(viewsets.ModelViewSet):
    queryset = Promo.objects.all().order_by('-start_date')
    serializer_class = PromoSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

