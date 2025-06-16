from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Order, OrderItem, PaymentMethod
from .serializers import (
    OrderSerializer,
    PaymentMethodSerializer,
    OrderProofUploadSerializer
)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        # Tidak mengurangi stok di sini!
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'], permission_classes=[IsAuthenticated])
    def upload_proof(self, request, pk=None):
        order = self.get_object()
        # Hanya boleh upload proof jika status bukan cancelled
        if order.payment_status == 'cancelled':
            return Response({'detail': 'Order sudah dibatalkan.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = OrderProofUploadSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            # Cek dan kurangi stok produk DI SINI (dan hanya sekali)
            if order.payment_status != 'waiting_confirm':  # Cegah double stok cut
                for item in order.items.all():
                    product = item.product
                    if product.stock < item.qty:
                        return Response(
                            {'detail': f'Stok {product.name} tidak cukup!'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    product.stock -= item.qty
                    product.save()
                order.payment_status = 'waiting_confirm'
                order.save()
            return Response({'status': 'proof_uploaded'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['patch'], permission_classes=[IsAdminUser])
    def cancel(self, request, pk=None):
        """Admin membatalkan order, stok produk dikembalikan."""
        order = self.get_object()
        if order.payment_status == "cancelled":
            return Response({'detail': 'Order sudah dibatalkan.'}, status=status.HTTP_400_BAD_REQUEST)
        # Kembalikan stok HANYA jika sudah pernah dipotong (order waiting_confirm/paid)
        if order.payment_status == "waiting_confirm":
            for item in order.items.all():
                product = item.product
                product.stock += item.qty
                product.save()
        order.payment_status = 'cancelled'
        order.save()
        return Response({'status': 'Order dibatalkan & stok produk dikembalikan'}, status=status.HTTP_200_OK)

# --- PAYMENT METHOD VIEWSET ---
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer

    def get_permissions(self):
        # User biasa hanya boleh GET, admin bisa CRUD
        if self.action in ['list', 'retrieve']:
            return []
        return [IsAdminUser()]
