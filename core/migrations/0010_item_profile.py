# Generated by Django 2.2.4 on 2020-07-15 13:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20200715_1217'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='profile',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='core.UserProfile'),
            preserve_default=False,
        ),
    ]
