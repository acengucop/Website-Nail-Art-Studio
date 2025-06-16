
from django.contrib import admin
from .models import Service, PaymentMethod, Booking

admin.site.register(Service)
admin.site.register(PaymentMethod)
admin.site.register(Booking)
