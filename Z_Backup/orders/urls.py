from rest_framework.routers import DefaultRouter
from .views import OrderViewSet, PaymentMethodViewSet

router = DefaultRouter()
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'payment-methods', PaymentMethodViewSet)

urlpatterns = router.urls
