from .hooks.tweets import hook_save_tweets, hook_get_tweets
from .hooks.agents import hook_get_all_agents, hook_create_new_agents

def save_tweets(request):
    return hook_save_tweets(request)
def get_tweets(tweets_Id):
    return hook_get_tweets(tweets_Id)

def get_all_agents():
    return hook_get_all_agents()
def create_new_agents(request):
    return hook_create_new_agents(request)
