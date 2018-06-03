from django.contrib import admin

from .models import Task, Team, Project

# Register your models here.

class TaskModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'priority')

    search_fields = ['id', 'name', 'description' ]

class TeamModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)

    search_fields = ['id', 'name', 'project__name']

class ProjectModelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')

    search_fields = ['id', 'name', 'description',]

admin.site.register(Task, TaskModelAdmin)
admin.site.register(Team, TeamModelAdmin)
admin.site.register(Project, ProjectModelAdmin)