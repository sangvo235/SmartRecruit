# Generated by Django 5.0.4 on 2024-04-27 12:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0002_remove_job_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='image',
            field=models.ImageField(default='uploads/jobs/default.jpg', upload_to='uploads/jobs'),
        ),
    ]