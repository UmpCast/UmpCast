# Generated by Django 4.0.3 on 2022-04-02 02:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0003_organization_description_organization_logo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('date_time', models.DateTimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('division', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organizations.division')),
            ],
        ),
    ]
