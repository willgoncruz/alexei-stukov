from django.db import models
from stukov.users.models import User

# Create your models here.

class Task(models.Model):
    OPTIONS = (
        ('BAC', 'Backlog'),
        ('TOD', 'To do'),
        ('DON', 'Doing'),
        ('DOI', 'Done'),
    )

    name = models.CharField(max_length=255, blank=False, null=False)
    date_limit = models.DateField(blank=False, null=False)
    description = models.TextField()
    priority = models.IntegerField()
    status = models.CharField(max_length=3, choices=OPTIONS, default='BAC')
    finished_date = models.DateField(blank=True,null=True)

class Project(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField()

class Team(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    project = models.ForeignKey(Project, blank=False, null=False, on_delete=models.CASCADE)
    users = models.ManyToManyField(User)
    tasks = models.ManyToManyField(Task, blank=True)

