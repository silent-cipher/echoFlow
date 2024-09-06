import json
from dotenv import dotenv_values
from llama_index.llms.gemini import Gemini 
from rest_framework.response import Response
from llama_index.core.llms import ChatMessage
config = dotenv_values(".env")
API_KEY =  config.get("API_KEY")

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)


def get_tweet_sentiment_agent(tweet):
    prompt = f"""
    Analyze the sentiment of the following tweet:
    
    Tweet: "{tweet}"
    
    Provide the following information:
    - Overall sentiment: (positive, negative, neutral)
    - Keywords or topics identified in the tweet
    - A brief explanation of why the sentiment was classified that way
    
    response must be in json formate:
    {{
        "sentiment": "positive",
        "keywords": ["keyword1", "keyword2"],
        "explanation": "The tweet contains positive sentiment because..."
    }}
    """
    gemini_model = Gemini(api_key=API_KEY, model="models/gemini-1.5-flash", max_tokens=256)
    response = gemini_model.chat([ChatMessage(role="user", content=prompt)])
    print("Raw response:", response)
    response = str(response)
    #  assistant: ```json{}```
    cleaned_response = response.strip()[18:-3].strip()
    response = json.loads(cleaned_response)
    return success_response({
        "sentiment": response.get("sentiment"),
        "keywords": response.get("keywords"),
        "explanation": response.get("explanation")
    })
