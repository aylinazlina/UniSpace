# chatbot/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .logic import get_bot_reply

@api_view(['POST'])
def chat_api(request):
    try:
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        reply = get_bot_reply(user_message)
        return Response({"reply": reply})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
