# Generated by Django 2.0.6 on 2018-06-25 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0002_auto_20180603_2346'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='date_done',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('BAC', 'Backlog'), ('TOD', 'To do'), ('DON', 'Doing'), ('DOI', 'Done')], default='BAC', max_length=3),
        ),
    ]
