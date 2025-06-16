from rest_framework import serializers
from .models import Promo, Product
from django.contrib.auth.models import User

# Untuk Halaman Promo
class PromoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promo
        fields = '__all__'

# Untuk Halaman Toko/Product
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# Untuk Register User (Nomor HP disimpan di kolom email)
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)  # Nomor HP dari frontend

    class Meta:
        model = User
        fields = ('username', 'phone', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['phone'],  # Nomor HP disimpan di kolom email
            password=validated_data['password']
        )
        return user
