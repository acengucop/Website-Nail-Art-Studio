from django.urls import path
from .views import (
    ServiceListView, PaymentMethodListView, BookingAvailabilityView,
    BookingCreateWithProofView, BookingListView, BookingAllListView,
    BookingVerifyPaymentView
)

urlpatterns = [
    path('services/', ServiceListView.as_view(), name='service-list'),
    path('payment-method/', PaymentMethodListView.as_view(), name='payment-method-list'),
    path('booking/availability/', BookingAvailabilityView.as_view(), name='booking-availability'),
    path('booking/create/', BookingCreateWithProofView.as_view(), name='booking-create'),
    path('booking/my/', BookingListView.as_view(), name='booking-my-list'),
    path('booking/all/', BookingAllListView.as_view(), name='booking-all-list'),
    path('booking/<int:pk>/verify-payment/', BookingVerifyPaymentView.as_view(), name='booking-verify-payment'),
]
