from django.db import models

# Pilihan badge label & warna agar admin mudah memilih (dropdown)
BADGE_LABEL_CHOICES = [
    ("Promo", "Promo"),
    ("Bestseller", "Bestseller"),
    ("New", "New"),
    ("Limited", "Limited"),
    # Bebas tambah label di sini!
]

BADGE_COLOR_CHOICES = [
    ("bg-primary/80", "Primary"),
    ("bg-secondary/80", "Secondary"),
    ("bg-accent/80", "Accent"),
    ("bg-red-500", "Merah"),
    ("bg-green-600", "Hijau"),
    # Bebas tambah warna lain!
]

# //MODEL HALAMAN PROMO
class Promo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='promo/')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    old_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)   # Harga sebelum diskon
    price = models.DecimalField(max_digits=12, decimal_places=0)     # Harga diskon/akhir

    def __str__(self):
        return self.title

# //MODEL HALAMAN TOKO
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=0)
    image = models.ImageField(upload_to='products/')

    # Promo fields (optional)
    promo_active = models.BooleanField(default=False)
    promo_start = models.DateField(null=True, blank=True)
    promo_end = models.DateField(null=True, blank=True)
    promo_old_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    promo_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)

    # Badge fields (dinamis & dropdown di admin)
    badge_label = models.CharField(
        max_length=32, blank=True, null=True,
        choices=BADGE_LABEL_CHOICES,
        help_text="Label badge produk (misal: New, Bestseller, Limited, Promo, dst)"
    )
    badge_color = models.CharField(
        max_length=32, blank=True, null=True,
        choices=BADGE_COLOR_CHOICES,
        help_text="Pilih warna badge (atau isi manual Tailwind class)"
    )

    # Stock
    stock = models.PositiveIntegerField(default=0, help_text="Stok produk yang tersedia")

    def __str__(self):
        return self.name
