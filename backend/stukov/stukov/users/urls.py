from django.urls import path
from django.conf.urls import url, include

from . import views

app_name = "users"
urlpatterns = [
    path("", view=views.UserListView.as_view(), name="list"),
]
