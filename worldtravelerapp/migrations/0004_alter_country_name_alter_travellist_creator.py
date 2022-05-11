# Generated by Django 4.0.4 on 2022-04-26 03:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('worldtravelerapp', '0003_country_alter_travellist_creator_travellist_countrys'),
    ]

    operations = [
        migrations.AlterField(
            model_name='country',
            name='name',
            field=models.CharField(max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='travellist',
            name='creator',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL),
        ),
    ]