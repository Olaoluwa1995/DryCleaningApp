# Generated by Django 2.2.4 on 2020-07-15 11:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0008_auto_20200715_1208'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='firstname',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='userprofile',
            old_name='lastname',
            new_name='last_name',
        ),
    ]
