# Generated by Django 5.1.4 on 2025-06-16 07:14

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('duration', models.PositiveIntegerField(default=60)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('rejected', 'Rejected'), ('cancelled', 'Cancelled'), ('done', 'Done')], default='pending', max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('payment_method', models.CharField(blank=True, max_length=100, null=True)),
                ('payment_proof', models.ImageField(blank=True, null=True, upload_to='payment_proofs/')),
                ('paid_amount', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('payment_status', models.CharField(choices=[('unpaid', 'Belum bayar'), ('waiting', 'Menunggu verifikasi'), ('verified', 'Terverifikasi'), ('rejected', 'Ditolak')], default='unpaid', max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='appointments.service')),
            ],
            options={
                'unique_together': {('service', 'date', 'time')},
            },
        ),
    ]
