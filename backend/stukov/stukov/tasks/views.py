from django.shortcuts import render

from rest_framework import viewsets

from .serializers import TaskSerializer, TeamSerializer, ProjectSerializer, TeamListSerializer
from .models import Task, Project, Team

# Create your views here.
class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

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
