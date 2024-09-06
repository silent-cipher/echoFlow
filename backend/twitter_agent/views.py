from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import save_tweets, get_tweets

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