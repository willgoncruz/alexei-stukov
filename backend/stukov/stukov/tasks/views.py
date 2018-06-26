from django.shortcuts import render

# -*- coding: utf-8 -*-
from django.views.generic import TemplateView, DetailView
from rest_framework import viewsets
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic.base import View

import csv

from .serializers import TaskSerializer, TeamSerializer, ProjectSerializer, TeamListSerializer, TaskCreateSerializer
from .models import Task, Project, Team

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request):
        self.serializer_class = TaskCreateSerializer
        return super().create(request)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    def retrieve(self, request, pk=None):
        self.serializer_class = TeamListSerializer
        return super().retrieve(request, pk)

    def list(self, request, pk=None):
        self.serializer_class = TeamListSerializer
        return super().list(request, pk)

class AllProjectsPerTeamViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class ExportView(View):
    model = Project


    def get_object(self, projectId):
        if hasattr(self, 'object'):
            return self.object
        print(projectId)
        self.object = Project.objects.get(id=projectId)
        return self.object

    def generate_string_for_date(self, date):
        if date == None:
            return ""
        return str(date.day) + '/' + str(date.month) + '/' + str(date.year)


    def get(self, request, projectId):
        project = self.get_object(projectId)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="projeto' + project.name.replace(' ', '_') + '.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Nome da tarefa',
            'Descricao',
            'Data limite',
            'Prioridade',
            'Status',
        ])

        tasks = []
        for team in project.team_set.all():
            new_tasks = [t for t in team.tasks.all()]
            tasks = tasks + new_tasks

        for task in tasks:
            writer.writerow([
                task.name,
                task.description,
                self.generate_string_for_date(task.date_limit),
                task.priority,
                task.status
            ])

        return response