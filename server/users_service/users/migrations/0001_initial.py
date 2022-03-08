# Generated by Django 4.0.3 on 2022-03-06 07:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.CharField(max_length=255, primary_key=True, serialize=False),
                ),
                ("first_name", models.CharField(max_length=255)),
                ("last_name", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255)),
                ("address", models.CharField(max_length=255)),
                ("phone_number", models.CharField(max_length=255)),
            ],
        ),
    ]
