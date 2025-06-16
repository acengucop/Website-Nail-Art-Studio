from rest_framework import generics, permissions, status, views, serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from django.shortcuts import get_object_or_404
from .models import Booking, Service, PaymentMethod
from .serializers import (
    BookingSerializer, ServiceSerializer, PaymentMethodSerializer
)
from datetime import datetime

# Endpoint: List Service
class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

# Endpoint: List PaymentMethod
class PaymentMethodListView(generics.ListAPIView):
    queryset = PaymentMethod.objects.filter(is_active=True)
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.AllowAny]

# Endpoint: Cek slot booking available per hari dan service
class BookingAvailabilityView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        date_str = request.GET.get('date')
        service_id = request.GET.get('service_id')
        if not date_str or not service_id:
            return Response({"error": "date and service_id required"}, status=400)
        date_obj = datetime.strptime(date_str, "%Y-%m-%d").date()
        service = get_object_or_404(Service, id=service_id)
        slots = {f"{hour:02d}:00": "available" for hour in range(10, 23)}
        bookings = Booking.objects.filter(date=date_obj, service=service)
        for booking in bookings:
            slot_time = booking.time.strftime("%H:%M")
            slots[slot_time] = "booked"
        if date_obj == datetime.now().date():
            now_hour = datetime.now().hour
            for hour in range(10, 23):
                if hour <= now_hour:
                    slots[f"{hour:02d}:00"] = "expired"
        return Response(slots)

# --- REFACTOR Booking Create: Booking hanya dibuat jika sudah upload bukti & payment method ---
class BookingCreateWithProofView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        service_id = request.data.get('service_id')
        date = request.data.get('date')
        time_str = request.data.get('time')
        payment_method_id = request.data.get('payment_method_id')
        payment_proof = request.data.get('payment_proof')

        # Validasi
        if not (service_id and date and time_str and payment_method_id and payment_proof):
            return Response({'error': 'Semua field wajib diisi.'}, status=400)
        try:
            time_obj = datetime.strptime(time_str, "%H:%M").time()
        except Exception:
            return Response({'error': 'Format jam salah'}, status=400)
        service = get_object_or_404(Service, id=service_id)
        if Booking.objects.filter(date=date, time=time_obj, service=service, status__in=['pending', 'waiting', 'confirmed']).exists():
            return Response({'error': 'Slot sudah dibooking.'}, status=400)
        payment_method = get_object_or_404(PaymentMethod, id=payment_method_id, is_active=True)

        dp_amount = float(service.price) * 0.4

        booking = Booking.objects.create(
            user=request.user,
            service=service,
            date=date,
            time=time_obj,
            status='pending',
            payment_method=payment_method,
            payment_proof=payment_proof,
            paid_amount=dp_amount,
            payment_status='waiting',
        )
        return Response({'id': booking.id, 'status': 'Booking dikirim, menunggu verifikasi admin'}, status=201)

# Endpoint: List booking milik user
class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-date', '-time')

# Endpoint: Admin verifikasi/reject pembayaran
class BookingVerifyPaymentView(views.APIView):
    permission_classes = [IsAdminUser]
    def post(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        action = request.data.get('action')  # 'accept' / 'reject'
        if booking.payment_status != 'waiting':
            return Response({'error': 'Status pembayaran tidak valid.'}, status=400)
        if action == 'accept':
            booking.payment_status = 'verified'
            booking.status = 'confirmed'
        elif action == 'reject':
            booking.payment_status = 'rejected'
            booking.status = 'pending'
        else:
            return Response({'error': 'Action tidak valid'}, status=400)
        booking.save()
        return Response({'status': f'Bukti pembayaran {"diterima" if action=="accept" else "ditolak"}'})

# Endpoint: List semua booking (admin)
class BookingAllListView(generics.ListAPIView):
    queryset = Booking.objects.all().order_by('-date', '-time')
    serializer_class = BookingSerializer
    permission_classes = [IsAdminUser]
