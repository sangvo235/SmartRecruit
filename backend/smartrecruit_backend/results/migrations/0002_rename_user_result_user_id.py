# Generated by Django 5.0.4 on 2024-05-09 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('results', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='result',
            old_name='user',
            new_name='user_id',
        ),
    ]
