# Generated by Django 4.2.7 on 2023-11-02 20:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='graf20',
            name='tema',
            field=models.CharField(max_length=200),
        ),
    ]
