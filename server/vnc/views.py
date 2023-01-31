import json
from django.shortcuts import render
# import pyautogui
from django.http import JsonResponse
from rest_framework.views import APIView

def screenshot(request):
    # # Take a screenshot of the local desktop
    # img = pyautogui.screenshot()

    # # Save the screenshot to a file
    # img.save('screenshot.png')

    return JsonResponse({"success": True, "screenshot": "img_path"})

class CoordinateView(APIView):
    def post(self, request, *args, **kwargs):
        data = request.body
        coordinates = json.loads(data)
        x = coordinates['x']
        y = coordinates['y']
        doubleClick = coordinates['doubleClick']
  
        # Do something with the coordinates
        return JsonResponse(coordinates)