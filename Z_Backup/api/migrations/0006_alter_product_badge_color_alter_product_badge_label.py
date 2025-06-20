# Generated by Django 5.1.4 on 2025-05-19 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_product_badge_color_product_badge_label_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='badge_color',
            field=models.CharField(blank=True, choices=[('bg-primary/80', 'Primary'), ('bg-secondary/80', 'Secondary'), ('bg-accent/80', 'Accent'), ('bg-red-500', 'Merah'), ('bg-green-600', 'Hijau')], help_text='Pilih warna badge (atau isi manual Tailwind class)', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='badge_label',
            field=models.CharField(blank=True, choices=[('Promo', 'Promo'), ('Bestseller', 'Bestseller'), ('New', 'New'), ('Limited', 'Limited')], help_text='Label badge produk (misal: New, Bestseller, Limited, Promo, dst)', max_length=32, null=True),
        ),
    ]
