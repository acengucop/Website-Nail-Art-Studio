from rest_framework import serializers
from .models import Booking, Service, PaymentMethod

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), write_only=True, source='service'
    )
    user = serializers.StringRelatedField(read_only=True)

    payment_method = PaymentMethodSerializer(read_only=True)
    payment_method_id = serializers.PrimaryKeyRelatedField(
        queryset=PaymentMethod.objects.filter(is_active=True),
        write_only=True,
        source='payment_method',
        allow_null=True,
        required=False
    )

    class Meta:
        model = Booking
        fields = [
            'id', 'user',
            'service', 'service_id',
            'date', 'time', 'status', 'created_at',
            'payment_method', 'payment_method_id',
            'payment_proof', 'paid_amount', 'payment_status'
        ]
        read_only_fields = (
            'user', 'status', 'created_at',
            'payment_method', 'payment_status', 'paid_amount'
        )
