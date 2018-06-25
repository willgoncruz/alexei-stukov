from rest_framework import serializers

from .models import Task, Project, Team
from stukov.users.serializers import UserSerializer


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('url', 'id', 'name', 'date_limit', 'description', 'priority','status','finished_date')

class TeamListSerializer(serializers.HyperlinkedModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Team
        fields = ('url', 'id', 'name', 'users', 'tasks')

class ProjectSerializer(serializers.HyperlinkedModelSerializer):
    teams = serializers.SerializerMethodField('team_serializer')

    class Meta:
        model = Project
        fields = ('url', 'id', 'name', 'teams', 'description')

    def team_serializer(self, project):
        return TeamListSerializer(project.team_set.all(), many=True, context=self.context).data


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('url', 'id', 'name', 'project', 'users', 'tasks')
