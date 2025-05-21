from rest_framework import viewsets
from .models import Promo
from .serializers import PromoSerializer
from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets

class PromoViewSet(viewsets.ModelViewSet):
    queryset = Promo.objects.all().order_by('-start_date')
    serializer_class = PromoSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
