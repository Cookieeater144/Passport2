# Generated by Django 4.0.4 on 2022-04-27 07:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('worldtravelerapp', '0009_alter_travellist_countrys_alter_travellist_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travellist',
            name='creator',
            field=models.OneToOneField(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='travellistid', to=settings.AUTH_USER_MODEL),
        ),
    ]
