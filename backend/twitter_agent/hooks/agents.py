import os
import json
import uuid
from rest_framework.response import Response

def success_response(data):
    return Response({'response': data , 'status': 200, 'message': 'Success'})

def failed_response(data):
    return Response({'response': data , 'status': 500, 'message': 'Failed'} , status=500)

def hook_get_all_agents():
    database_dir = os.path.join(os.getcwd(), 'twitter_agent' , 'database')
    all_agents_files = os.path.join(database_dir, 'all_agents.json')
    if not os.path.exists(all_agents_files):
        return failed_response([])
    with open(all_agents_files, 'r') as file:
        agents = file.read()
    return success_response(json.loads(agents))

def hook_create_new_agents(request : dict):
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