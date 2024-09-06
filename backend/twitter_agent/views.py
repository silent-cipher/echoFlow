from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import save_tweets, get_tweets , get_all_agents , create_new_agents

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/twitter_agent/tweets/',
            'method': 'POST',
            'body': 'tweet array',
            'description': 'Save tweets to database by tweet id'
        },
        {
            'Endpoint': '/twitter_agent/tweets/',
            'method': 'GET',
            'description': 'Get tweets from database by tweet id'
        },
        {
            'Endpoint': '/twitter_agent/agents/',
            'method': 'POST',
            'body': 'agent array',
            'description': 'Create new agents'
        },
        {
            'Endpoint': '/twitter_agent/agents/',
            'method': 'GET',
            'description': 'Get all agents'
        }
    ]
    return Response(routes)

@api_view(['POST' , 'GET'])
def Tweets(request):
    if request.method == 'POST':
        return save_tweets(request)
    elif request.method == 'GET':
        tweet_id = request.data['tweet_id']
        return get_tweets(tweet_id)

@api_view(['GET' , 'POST'])
def Agents(request):
    if request.method == 'POST':
        return create_new_agents(request)
    elif request.method == 'GET':
        return get_all_agents()