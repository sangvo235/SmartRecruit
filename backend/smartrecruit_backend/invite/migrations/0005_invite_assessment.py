# Generated by Django 5.0.4 on 2024-04-30 13:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invite', '0004_remove_invite_assessment'),
        ('online_assessment', '0002_assessment_job'),
    ]

    operations = [
        migrations.AddField(
            model_name='invite',
            name='assessment',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='invites', to='online_assessment.assessment'),
        ),
    ]
