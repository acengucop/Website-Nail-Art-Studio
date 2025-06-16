from rest_framework import serializers
from .models import Service, PaymentMethod, Booking

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'duration', 'price']

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = ['id', 'name', 'qr_image', 'description']

class BookingSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    payment_method = PaymentMethodSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), write_only=True, source='service'
    )
    payment_method_id = serializers.PrimaryKeyRelatedField(
        queryset=PaymentMethod.objects.filter(is_active=True), write_only=True, source='payment_method'
    )

    class Meta:
        model = Booking
        fields = [
            'id', 'user', 'service', 'service_id', 'date', 'time', 'status',
            'payment_method', 'payment_method_id', 'payment_proof', 'paid_amount', 'payment_status', 'created_at'
        ]
        read_only_fields = ['user', 'status', 'payment_status', 'paid_amount', 'created_at']
