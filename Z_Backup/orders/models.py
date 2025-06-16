from django.db import models
from django.contrib.auth.models import User

class PaymentMethod(models.Model):
    name = models.CharField(max_length=100, default="QRIS")
    qr_image = models.ImageField(upload_to='payment_qr/')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Menunggu Pembayaran'),
        ('waiting_confirm', 'Menunggu Konfirmasi Admin'),
        ('paid', 'Lunas'),
        ('cancelled', 'Dibatalkan'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    payment_method = models.ForeignKey(PaymentMethod, on_delete=models.SET_NULL, null=True)
    payment_proof = models.ImageField(upload_to='payment_proof/', null=True, blank=True)
    payment_status = models.CharField(
        max_length=20,
        choices=PAYMENT_STATUS_CHOICES,
        default='pending'
    )

    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey('api.Product', on_delete=models.CASCADE)
    qty = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.product.name} x {self.qty}"
