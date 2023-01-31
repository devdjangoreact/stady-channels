import subprocess
import time

subprocess.run(["wmctrl", "-n", "1"]) #create new desktop
subprocess.run(["gnome-terminal", "-d", "1", "-e", "ls"]) # run command in new desktop
time.sleep(10)
subprocess.run(["wmctrl", "-c", ":ACTIVE:"]) # close new desktop
