from django.db import models
from django.conf import settings

class Service(models.Model):
    name = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(default=60)  # in minutes
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class PaymentMethod(models.Model):
    name = models.CharField(max_length=100, default="QRIS")
    qr_image = models.ImageField(upload_to='payment_qr/')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
        ('done', 'Done'),
    ]
    PAYMENT_STATUS = [
        ('unpaid', 'Belum bayar'),
        ('waiting', 'Menunggu verifikasi'),
        ('verified', 'Terverifikasi'),
        ('rejected', 'Ditolak'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    payment_method = models.ForeignKey(PaymentMethod, null=True, blank=True, on_delete=models.SET_NULL)
    payment_proof = models.ImageField(upload_to='payment_proofs/', blank=True, null=True)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(max_length=10, choices=PAYMENT_STATUS, default='unpaid')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('service', 'date', 'time')
        ordering = ['-date', '-time']

    def __str__(self):
        return f"{self.user} - {self.service} on {self.date} at {self.time}"  
