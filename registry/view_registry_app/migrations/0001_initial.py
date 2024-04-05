# Generated by Django 5.0.3 on 2024-04-05 01:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('registry_app', '0002_alter_wishlist_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField()),
                ('description', models.TextField(blank=True)),
                ('wishlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='registry_app.wishlist')),
            ],
        ),
    ]
