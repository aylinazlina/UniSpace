from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import *  # Replace with your actual app name


@ensure_csrf_cookie
def get_rooms(request):
    """API endpoint to get all rooms for React frontend"""
    rooms = Rooms.objects.all()

    # Format room data for JSON response
    rooms_data = []
    for room in rooms:
        rooms_data.append({
            'id': room.id,
            'room_no': room.room_no,
            'room_type': room.room_type,
            'room_pic': room.room_pic.url if room.room_pic else '',
            # Add any other fields you need
        })

    # Return JSON response with rooms data and user permissions
    return JsonResponse({
        'rooms': rooms_data,
        'is_staff': request.user.is_staff,
    })