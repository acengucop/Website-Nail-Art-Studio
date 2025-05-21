from rest_framework import serializers
from .models import Promo
from .models import Product
from rest_framework import serializers

#// UNTUK HALAMAN PROMO
class PromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promo
        fields = '__all__'

#// UNTUK HALAMAN TOKO
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
