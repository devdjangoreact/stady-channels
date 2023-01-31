import pyautogui
from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/screenshot')
def screenshot():
    # Take a screenshot of the local desktop
    img = pyautogui.screenshot()

    # Save the screenshot to a file
    img.save('static/screenshot.png')

    return render_template('screenshot.html')

if __name__ == '__main__':
    app.run()
