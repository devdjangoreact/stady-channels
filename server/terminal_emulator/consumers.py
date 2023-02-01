import subprocess
import os
import re
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class TerminalConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.cwd = os.getcwd()
        await self.accept()

    async def disconnect(self, close_code):
        await self.close()

    async def receive(self, text_data):
        print(type(text_data))
        command = text_data.strip()
        if command == "":
            response = {"output": ""}
        elif command == "autocomplete":
            completions = self.autocomplete(data["autocomplete_text"])
            response = {"autocomplete_options": completions}
        elif command.startswith("cd "):
            try:
                os.chdir(command[3:].strip())
                self.cwd = os.getcwd()
                response = {"output": f"Changed working directory to {self.cwd}\n"}
            except Exception as e:
                response = {"output": str(e) + "\n"}
        else:
            try:
                output = subprocess.run(
                    command, shell=True, cwd=self.cwd, stdout=subprocess.PIPE, stderr=subprocess.PIPE
                )
                response = {"output": output.stdout.decode() + output.stderr.decode()}
            except Exception as e:
                response = {"output": str(e) + "\n"}
        await self.send(text_data=json.dumps(response))

    def autocomplete(self, text):
        command = text.strip().split(" ")
        if len(command) == 1:
            return self.autocomplete_commands(command[0])
        else:
            return self.autocomplete_files(text)

    def autocomplete_commands(self, text):
        completions = []
        for cmd in os.listdir("/bin"):
            if cmd.startswith(text):
                completions.append(cmd)
        return completions

    def autocomplete_files(self, text):
        completions = []
        directory = self.cwd
        regex = re.compile(".*" + re.escape(text) + ".*")
        for file in os.listdir(directory):
            if regex.match(file):
                completions.append(file)
        return completions
