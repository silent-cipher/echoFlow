import os
import json
from rest_framework.response import Response

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)

def get_generate_system_prompt(tweet_id):
    tweet_id_file_path = os.path.join(os.getcwd(), 'twitter_agent', 'database', 'tweets', tweet_id, tweet_id + '.json')
    tweets_data = []
    with open(tweet_id_file_path, 'r') as tweet_id_file:
        tweets_data = json.load(tweet_id_file)
        
        prompt = """
        You are an AI designed to generate tweets that mirror the user's style and tone, based on their past posts.
        Analyze the provided tweets to capture their voice, including word choice, tone (e.g., humorous or serious), and recurring themes.
        Ensure each new tweet follows the same structure, integrates relevant hashtags and tags, and evolves naturally from the previous content.
        Your goal is to create authentic, engaging tweets that blend seamlessly into the user's Twitter feed and resonate with their audience.
        
        Previous tweets:
        """
        
        for tweet in tweets_data:
            prompt += f"[[{tweet}]], "
        prompt = prompt.rstrip(", ")
        
        print(prompt)
        return success_response(prompt)
