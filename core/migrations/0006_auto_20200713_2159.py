# Generated by Django 2.2.4 on 2020-07-13 20:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_item_updated'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='variation',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='variation',
            name='item',
        ),
        migrations.AlterModelOptions(
            name='item',
            options={'ordering': ('-publish',)},
        ),
        migrations.RemoveField(
            model_name='orderitem',
            name='item_variations',
        ),
        migrations.DeleteModel(
            name='ItemVariation',
        ),
        migrations.DeleteModel(
            name='Variation',
        ),
    ]
