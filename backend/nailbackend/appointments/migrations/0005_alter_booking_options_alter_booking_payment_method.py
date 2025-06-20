# Generated by Django 5.1.4 on 2025-06-16 17:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appointments', '0004_alter_booking_options_booking_paid_amount_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='booking',
            options={'ordering': ['-date', '-time']},
        ),
        migrations.AlterField(
            model_name='booking',
            name='payment_method',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='appointments.paymentmethod'),
        ),
    ]
