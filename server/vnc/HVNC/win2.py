import subprocess
import pyautogui
import time

# create new hidden desktop
subprocess.run(["powershell", "-Command", "New-Item -ItemType Directory 'C:\Windows\Temp\NewDesktop'"])
subprocess.run(["powershell", "-Command", "Add-Type -AssemblyName System.Windows.Forms"])
subprocess.run(["powershell", "-Command", "$objDesktop = [System.Windows.Forms.SystemInformation]::Desktop"])
subprocess.run(["powershell", "-Command", "$objDesktop.SetThreadDesktop(New-Object -ComObject Shell.Application).GetDesktopFolder().ParseName('C:\Windows\Temp\NewDesktop')"])

# switch to new hidden desktop
subprocess.run(["start", "/min", "cmd.exe", "/c", "start explorer.exe shell:AppsFolder\Microsoft.Windows.CommandPrompt"])

# run command 
subprocess.run(["powershell", "-Command", "dir"])

# take a screenshot
screenshot = pyautogui.screenshot()

#save the screenshot
screenshot.save('screenshot.png')

# Wait 10 seconds
time.sleep(10)

# Close the window and switch back to the original desktop
subprocess.run(["powershell", "-Command", "$objDesktop.SetThreadDesktop((New-Object -ComObject Shell.Application).GetDesktopFolder().ParseName('Desktop'))"])

#remove hidden desktop
subprocess.run(["powershell", "-Command", "Remove-Item 'C:\Windows\Temp\NewDesktop'"])


