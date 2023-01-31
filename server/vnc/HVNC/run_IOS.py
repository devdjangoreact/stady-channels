import subprocess
import time

subprocess.run(["osascript", "-e", 'tell application "System Events" to key code 18 using {command down, option down}']) #create new desktop
subprocess.run(["osascript", "-e", 'tell application "Terminal" to do script "ls" in window 1']) # run command in new desktop
time.sleep(10)
subprocess.run(["osascript", "-e", 'tell application "System Events" to key code 20 using {command down}']) # close new desktop
