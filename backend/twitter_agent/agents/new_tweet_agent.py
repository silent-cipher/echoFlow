import json
from llama_index.core import Settings
from llama_index.core import SummaryIndex
from llama_index.llms.gemini import Gemini
from llama_index.core import StorageContext
from llama_index.core.schema import Document
from rest_framework.response import Response
from llama_index.core.node_parser import SentenceSplitter
from llama_index.core.storage.docstore import SimpleDocumentStore
from dotenv import dotenv_values
config = dotenv_values(".env")
API_KEY =  config.get("API_KEY")
print("API_KEY" , API_KEY)

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)


def new_tweet_agent(doc , new_tweet_query):
    try :
        print("new_tweet_query" , new_tweet_query)
        print("doc" , doc.get("text"))
        documents = [Document(text=doc.get("text"), metadata = doc.get("metadata"), id_=doc.get("_id"))]
        nodes = SentenceSplitter().get_nodes_from_documents(documents)
        docstore = SimpleDocumentStore()
        docstore.add_documents(nodes)
        storage_context = StorageContext.from_defaults(docstore=docstore)
        summary_index = SummaryIndex(nodes, storage_context=storage_context)
        llm = Gemini(api_key=API_KEY , model="models/gemini-1.5-flash" , max_tokens=256)
        Settings.llm = llm
        Settings.chunk_size = 256
        
        query_engine = summary_index.as_query_engine()
        prompt = f"""
        Based on the following text provided by the user:
        
        "{new_tweet_query}"
        
        Generate a creative tweet that includes the following:
        - A catchy heading (short and impactful)
        - A brief description that summarizes the key points of the text
        - Relevant hashtags (no more than 5)
        - Tags for any relevant users or entities (e.g., brands, influencers)
        
        Ensure the tweet is engaging, well-structured, and suitable for a wide audience.
        
        response must be in json formate:
        {{
            "tweet_heading": "The generated tweet heading",
            "tweet_description": "The generated tweet description",
            "hashtags": ["hashtag1", "hashtag2"],
            "tags": ["tag1", "tag2"]
        }}
        """
        response = query_engine.query(prompt)
        response = str(response)
        print("response" , response)
        cleaned_response = response.strip()[7:-3].strip()
        response = json.loads(cleaned_response)
        
        return success_response({
            "tweet_heading": response.get("tweet_heading"),
            "tweet_description": response.get("tweet_description"),
            "hashtags": response.get("hashtags"),
            "tags": response.get("tags")
        })
    except Exception as e:
        print("Error:" , e)
        return failed_response({
            "tweet_heading": "Error",
            "tweet_description": "An error occurred while generating the tweet.",
            "hashtags": ["Error"],
            "tags": ["Error"]
        })
