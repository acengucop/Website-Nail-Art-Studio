from django.db import models

BADGE_LABEL_CHOICES = [
    ("Promo", "Promo"),
    ("Bestseller", "Bestseller"),
    ("New", "New"),
    ("Limited", "Limited"),
]

BADGE_COLOR_CHOICES = [
    ("bg-primary/80", "Primary"),
    ("bg-secondary/80", "Secondary"),
    ("bg-accent/80", "Accent"),
    ("bg-red-500", "Merah"),
    ("bg-green-600", "Hijau"),
]

class Promo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='promo/')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    old_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=0)

    def __str__(self):
        return self.title

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=0)
    image = models.ImageField(upload_to='products/')
    promo_active = models.BooleanField(default=False)
    promo_start = models.DateField(null=True, blank=True)
    promo_end = models.DateField(null=True, blank=True)
    promo_old_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
    promo_price = models.DecimalField(max_digits=12, decimal_places=0, null=True, blank=True)
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
    stock = models.PositiveIntegerField(default=0, help_text="Stok produk yang tersedia")

    def __str__(self):
        return self.name



class GalleryImage(models.Model):
    CATEGORY_CHOICES = [
        ('minimalis', 'Minimalis'),
        ('glossy', 'Glossy'),
        ('cute', 'Cute'),
        ('glitter', 'Glitter'),
    ]
    image = models.ImageField(upload_to='gallery/')
    alt = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.alt