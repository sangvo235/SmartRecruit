# Generated by Django 5.0.4 on 2024-04-21 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0004_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
