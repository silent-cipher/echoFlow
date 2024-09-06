import os
import json
import uuid
from rest_framework.response import Response

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)


def save_tweets(request):
    print(request.data)
    # saving tweets to database
    database_dir = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'tweets')
    if not os.path.exists(database_dir):
        os.makedirs(database_dir)
    tweets_Id = str(uuid.uuid4())
    file_name = tweets_Id + '.json'
    file_path = os.path.join(database_dir, file_name)
    with open(file_path, 'w') as file:
        file.write(json.dumps(request.data))
    
    # saving tweets id to all_tweets_ids.json
    all_tweets_ids_file = os.path.join(database_dir, '../all_tweets_ids.json')
    if os.path.exists(all_tweets_ids_file):
        with open(all_tweets_ids_file, 'r') as file:
            all_tweets_ids = file.read()
    else:
        all_tweets_ids = ''
    with open(all_tweets_ids_file, 'w') as file:
        if all_tweets_ids == '':
            all_tweets_ids = []
        else:
            all_tweets_ids = json.loads(all_tweets_ids)
        all_tweets_ids.append(tweets_Id)
        file.write(json.dumps(all_tweets_ids))
    
    return success_response(tweets_Id)

def get_tweets(tweets_Id):
    print(tweets_Id)
    database_dir = os.path.join(os.getcwd(), 'twitter_agent' , 'database' , 'tweets')
    file_path = os.path.join(database_dir, tweets_Id + '.json')
    if not os.path.exists(file_path):
        return failed_response([])
    with open(file_path, 'r') as file:
        tweets = file.read()
    return success_response(json.loads(tweets))

def get_all_agents():
    database_dir = os.path.join(os.getcwd(), 'twitter_agent' , 'database')
    all_agents_files = os.path.join(database_dir, 'all_agents.json')
    if not os.path.exists(all_agents_files):
        return failed_response([])
    with open(all_agents_files, 'r') as file:
        agents = file.read()
    return success_response(json.loads(agents))

def create_new_agents(request : dict):
    new_agent = request.data
    try :
        database_dir = os.path.join(os.getcwd(), 'twitter_agent' , 'database')
        if not os.path.exists(database_dir):
            os.makedirs(database_dir)
        file_path = os.path.join(database_dir, "all_agents.json")
        with open(file_path, 'r') as file:
            all_agents = file.read()
        if all_agents == '':
            all_agents = []
        else:
            all_agents = json.loads(all_agents)
        new_agent["agent_id"] = str(uuid.uuid4())
        all_agents.insert(0, new_agent)
        with open(file_path, 'w') as file:
            file.write(json.dumps(all_agents))
        return success_response({"agent_id": new_agent["agent_id"]})
    except:
        return failed_response({"agent_id": ""})