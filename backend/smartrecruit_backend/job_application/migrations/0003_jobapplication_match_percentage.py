# Generated by Django 5.0.4 on 2024-05-14 20:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job_application', '0002_remove_jobapplication_match_percentage'),
    ]

    operations = [
        migrations.AddField(
            model_name='jobapplication',
            name='match_percentage',
            field=models.FloatField(null=True),
        ),
    ]
