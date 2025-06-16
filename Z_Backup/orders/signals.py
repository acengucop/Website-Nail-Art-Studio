from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order

@receiver(post_save, sender=Order)
def restore_stock_on_cancel(sender, instance, created, **kwargs):
    if not created and instance.payment_status == 'cancelled':
        for item in instance.items.all():
            product = item.product
            product.stock += item.qty
            product.save()
