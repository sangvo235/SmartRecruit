# Generated by Django 5.0.4 on 2024-04-27 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('useraccount', '0005_alter_user_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='uploads/avatars/default.jpg', upload_to='uploads/avatars'),
        ),
        migrations.AlterField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=15),
        ),
    ]
