from rest_framework import generics, permissions, views, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Service, PaymentMethod, Booking
from .serializers import (
    ServiceSerializer, PaymentMethodSerializer, BookingSerializer
)
from datetime import datetime

class ServiceListView(generics.ListAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

class PaymentMethodListView(generics.ListAPIView):
    queryset = PaymentMethod.objects.filter(is_active=True)
    serializer_class = PaymentMethodSerializer
    permission_classes = [permissions.AllowAny]

class BookingAvailabilityView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        date_str = request.GET.get('date')
        service_id = request.GET.get('service_id')
        if not date_str or not service_id:
            return Response({'error': 'date and service_id required'}, status=status.HTTP_400_BAD_REQUEST)
        date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        service = get_object_or_404(Service, id=service_id)
        slots = {f"{hour:02d}:00": 'available' for hour in range(10, 23)}
        bookings = Booking.objects.filter(date=date_obj, service=service)
        now = datetime.now().date()
        for b in bookings:
            time_key = b.time.strftime('%H:%M')
            slots[time_key] = 'booked'
        if date_obj == now:
            current_hour = datetime.now().hour
            for hour in range(10, 23):
                if hour <= current_hour:
                    slots[f"{hour:02d}:00"] = 'expired'
        return Response(slots)

class BookingCreateWithProofView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        data = request.data
        required = ['service_id', 'date', 'time', 'payment_method_id', 'payment_proof']
        if not all(data.get(key) for key in required):
            return Response({'error': 'Semua field wajib diisi.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            time_obj = datetime.strptime(data['time'], '%H:%M').time()
        except Exception:
            return Response({'error': 'Format waktu salah, harus HH:MM'}, status=status.HTTP_400_BAD_REQUEST)
        service = get_object_or_404(Service, id=data['service_id'])
        if Booking.objects.filter(date=data['date'], time=time_obj, service=service,
                                  status__in=['pending', 'waiting', 'confirmed']).exists():
            return Response({'error': 'Slot sudah dibooking.'}, status=status.HTTP_400_BAD_REQUEST)
        payment_method = get_object_or_404(PaymentMethod, id=data['payment_method_id'], is_active=True)
        dp = float(service.price) * 0.4
        booking = Booking.objects.create(
            user=request.user,
            service=service,
            date=data['date'],
            time=time_obj,
            status='pending',
            payment_method=payment_method,
            payment_proof=data['payment_proof'],
            paid_amount=dp,
            payment_status='waiting'
        )
        return Response({'id': booking.id, 'status': 'Booking berhasil, menunggu verifikasi admin'}, status=status.HTTP_201_CREATED)


class BookingListView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

class BookingAllListView(generics.ListAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAdminUser]

class BookingVerifyPaymentView(views.APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk)
        action = request.data.get('action')
        if action == 'accept':
            booking.payment_status='verified'; booking.status='confirmed'
        elif action=='reject':
            booking.payment_status='rejected'; booking.status='pending'
        else:
            return Response({'error':'Action invalid'}, status=status.HTTP_400_BAD_REQUEST)
        booking.save()
        return Response({'status':booking.payment_status})