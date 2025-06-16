from rest_framework import serializers
from .models import Order, OrderItem, PaymentMethod
from api.models import Product

class ProductInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductInfoSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        write_only=True,
        source='product'
    )
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'qty']

class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    order_items = OrderItemSerializer(many=True, write_only=True)
    payment_method = PaymentMethodSerializer(read_only=True)
    payment_method_id = serializers.PrimaryKeyRelatedField(
        queryset=PaymentMethod.objects.all(),
        write_only=True,
        source='payment_method'
    )

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'created_at',
            'payment_method', 'payment_method_id',
            'payment_status', 'payment_proof',
            'items', 'order_items'
        ]
        read_only_fields = [
            'id', 'user', 'created_at',
            'payment_method', 'payment_status', 'payment_proof', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('order_items', [])
        validated_data.pop('user', None)
        order = Order.objects.create(user=self.context['request'].user, **validated_data)
        for item in items_data:
            product = item['product']
            qty = item['qty']
            # **TIDAK mengurangi stock DI SINI!** 
            OrderItem.objects.create(order=order, product=product, qty=qty)
        return order

class OrderProofUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['payment_proof']
