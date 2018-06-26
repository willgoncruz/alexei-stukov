from django.db import models
from stukov.users.models import User

# Create your models here.

class Task(models.Model):
    OPTIONS = (
        ('backlog', 'backlog'),
        ('todo', 'todo'),
        ('todo', 'doing'),
        ('done', 'done'),
    )

    name = models.CharField(max_length=255, blank=False, null=False)
    date_limit = models.DateField(blank=False, null=False)
    description = models.TextField()
    priority = models.IntegerField()
    status = models.CharField(max_length=100)
    finished_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    image_url = models.CharField(blank=True, null=True, max_length=512)
    description = models.TextField()

class Team(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    project = models.ForeignKey(Project, blank=False, null=False, on_delete=models.CASCADE)
    users = models.ManyToManyField(User)
    tasks = models.ManyToManyField(Task, blank=True)

