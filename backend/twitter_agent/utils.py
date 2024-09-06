import os
import json
from rest_framework.response import Response
from .hooks.tweets import hook_save_tweets, hook_get_tweets
from .hooks.agents import hook_get_all_agents, hook_create_new_agents
from .agents.new_tweet_agent import new_tweet_agent
from .agents.tweet_sentiment_agent import get_tweet_sentiment_agent

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)

def save_tweets(request):
    return hook_save_tweets(request)
def get_tweets(tweets_Id):
    return hook_get_tweets(tweets_Id)

def get_all_agents():
    return hook_get_all_agents()
def create_new_agents(request):
    return hook_create_new_agents(request)

def generate_new_tweet(request):
    agent_id = request.data['agent_id']
    new_tweet_query = request.data['new_tweet_query']
    
    all_agents_file_path = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'all_agents.json')
    with open(all_agents_file_path, 'r') as load_all_agents:
        all_agents = json.load(load_all_agents)
    matched_agent = [tweet for tweet in all_agents if tweet['agent_id'] == agent_id]
    tweets_id = matched_agent[0]['tweets_id']
    tweets_file_path = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'tweets' , tweets_id , tweets_id + '.json')
    doc ={}
    with open(tweets_file_path, 'r') as load_tweets:
        tweets_doc = json.load(load_tweets)
        doc["text"] = "\n\n".join(tweets_doc)
        doc["metadata"] = matched_agent[0]
        doc["_id"] = agent_id
    
    return new_tweet_agent(doc , new_tweet_query)

def generate_tweet_sentiment(request):
    tweet = request.data['tweet']
    return get_tweet_sentiment_agent(tweet)

def get_all_tweets_by_agent_id(agent_id):
    all_agents_file_path = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'all_agents.json')
    with open(all_agents_file_path, 'r') as load_all_agents:
        all_agents = json.load(load_all_agents)
    matched_agent = [tweet for tweet in all_agents if tweet['agent_id'] == agent_id]
    tweets_id = matched_agent[0]['tweets_id']
    tweets_file_path = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'tweets' , tweets_id , tweets_id + '.json')
    with open(tweets_file_path, 'r') as load_tweets:
        tweets_doc = json.load(load_tweets)
    return success_response(tweets_doc)