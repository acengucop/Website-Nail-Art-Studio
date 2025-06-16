from django.contrib import admin
from django.utils.html import format_html
from .models import Promo, Product

@admin.register(Promo)
class PromoAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "old_price", "start_date", "end_date")
    search_fields = ("title",)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name", "price", "promo_active", "promo_price", "promo_start", "promo_end",
        "badge_label", "badge_preview", "stock"
    )
    list_filter = ("promo_active", "badge_label",)
    search_fields = ("name",)

    def badge_preview(self, obj):
        if obj.badge_label:
            return format_html(
                f'<span class="{obj.badge_color or "bg-gray-400"} text-white px-2 py-1 rounded">{obj.badge_label}</span>'
            )
        return "-"
    badge_preview.short_description = "Preview Badge"
