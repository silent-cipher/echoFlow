from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import save_tweets, get_tweets , get_all_agents , create_new_agents , generate_new_tweet , generate_tweet_sentiment , get_all_tweets_by_agent_id

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
        },
        {
            'Endpoint': '/twitter_agent/gen_tweet/',
            'method': 'POST',
            'body': 'agent_id , new_tweet_query',
            'description': 'Generate new tweet'
        },
        {
            'Endpoint': '/twitter_agent/tweet_sentiment/',
            'method': 'POST',
            'body': 'tweet',
            'description': 'Generate tweet sentiment'
        },
        {
            'Endpoint': '/twitter_agent/get_all_tweets_by_agent_id/',
            'method': 'GET',
            'description': 'Get all tweets by agent id'
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

@api_view(['POST'])
def GenTweet(request):
    return generate_new_tweet(request)

@api_view(['POST'])
def TweetSentiment(request):
    return generate_tweet_sentiment(request)

@api_view(['GET'])
def all_tweets_by_agent_id(requst):
    agent_id = requst.data['agent_id']
    return get_all_tweets_by_agent_id(agent_id)