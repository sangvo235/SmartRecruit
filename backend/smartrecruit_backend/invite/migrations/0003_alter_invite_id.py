# Generated by Django 5.0.4 on 2024-04-30 12:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('invite', '0002_rename_assessment_id_invite_assessment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invite',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
