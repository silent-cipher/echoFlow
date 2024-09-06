from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path("twitter_agent/tweets/", views.Tweets, name="Tweets"),
    path('twitter_agent/agents/', views.Agents, name="Agents"),
    path('twitter_agent/gen_tweet/', views.GenTweet, name="GenTweet"),
    path('twitter_agent/tweet_sentiment/', views.TweetSentiment, name="TweetSentiment"),
    path('twitter_agent/get_all_tweets_by_agent_id/', views.all_tweets_by_agent_id, name="get_all_tweets_by_agent_id"),
]