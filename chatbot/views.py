from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .logic import get_bot_reply


# Create your chatbot views here.
@csrf_exempt
def chat_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "")
        if not user_message:
            return JsonResponse({"error": "No message provided."}, status=400)

        reply = get_bot_reply(user_message)
        return JsonResponse({"reply": reply})
    else:
        return JsonResponse({"error": "POST request required."}, status=405)
