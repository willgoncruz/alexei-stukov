from rest_framework import serializers

from .models import Task, Project, Team
from stukov.users.serializers import UserSerializer

class TeamListSerializerField(serializers.Field):
    '''
    TagListSerializer para tratar o App taggit, ja que nao possui suporte para
    rest_framework
    '''
    def to_internal_value(self, data):
        if  type(data) is list:
            return data
        try:
            teamList = ast.literal_eval(data)
            return teamList
        except BaseException as e:
            raise serializers.ValidationError("expected a list of data")

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('url', 'id', 'name', 'date_limit', 'description', 'priority','status','finished_date')


class TaskCreateSerializer(serializers.ModelSerializer):
    team = TeamListSerializerField(write_only=True)

    class Meta:
        model = Task
        fields = ('url', 'id', 'name', 'date_limit', 'description', 'priority','status','finished_date', 'team')

    def validate_team(self, value):
        teams = Team.objects.filter(id__in=value)
        if len(teams) == 0:
            raise serializers.ValidationError('There is a answer with a new id that did not exist before')
        teams = [t for t in teams]
        return teams

    def create(self, validated_data):
        teams = validated_data.pop('team')
        
        task = Task.objects.create(name=validated_data['name'], description=validated_data['description'],
                                    date_limit=validated_data['date_limit'],
                                    status=validated_data['status'], priority=validated_data['priority'])
        if 'finished_date' in validated_data:
            task.finished_date = validated_data['validated_data']
        
        for team in teams:
            team.tasks.add(task)

        task.save()

        return task

class TeamListSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)
    tasks = TaskSerializer(many=True)

    class Meta:
        model = Team
        fields = ('url', 'id', 'name', 'users', 'tasks')

class ProjectSerializer(serializers.ModelSerializer):
    teams = serializers.SerializerMethodField('team_serializer')

    class Meta:
        model = Project
        fields = ('url', 'id', 'name', 'teams', 'description')

    def team_serializer(self, project):
        return TeamListSerializer(project.team_set.all(), many=True, context=self.context).data


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('url', 'id', 'name', 'project', 'users', 'tasks')

'''
{
    "name": "asdfasd",
    "date_limit": "2018-10-10",
    "description": "asdfasdf",
    "priority": 2,
    "status" : "backlog",
    "team": [1]
}
'''