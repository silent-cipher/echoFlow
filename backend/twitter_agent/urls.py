from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path("twitter_agent/tweets/", views.Tweets, name="Tweets"),
    path('twitter_agent/agents/', views.Agents, name="Agents"),
]