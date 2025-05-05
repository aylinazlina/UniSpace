from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework import serializers
from rest_framework import viewsets

from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from rest_framework.response import Response
from .models import Rooms
from .serializers import RoomSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import api_view, permission_classes



from django.contrib.auth.models import User






class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # Return login URL in the response for frontend redirection
            return Response({
                'message': 'User created successfully',
                'redirect': '/login/'  # Frontend can use this to redirect
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt  # Only use this for development. Use proper CSRF handling later.
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'message': 'Invalid credentials'}, status=401)
        except Exception as e:
            return JsonResponse({'message': str(e)}, status=500)
    else:
        return JsonResponse({'message': 'Method not allowed'}, status=405)

class RoomListView(APIView):
    def get(self, request):
        rooms = Rooms.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


# views.py



class RoomListView(APIView):
    """
    API view to get all rooms
    """
    permission_classes = [AllowAny]

    def get(self, request):
        rooms = Rooms.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def search_rooms(request):
    room_no = request.GET.get('q', None)

    if room_no:
        try:
            room_no_int = int(room_no)
            rooms = Rooms.objects.filter(room_no=room_no_int)

            if not rooms.exists():
                return Response({'message': f'No rooms found with number {room_no}'}, status=404)

            serializer = RoomSerializer(rooms, many=True)
            return Response(serializer.data)

        except ValueError:
            return Response({'message': 'Please enter a valid room number'}, status=400)

    return Response({'message': 'No search query provided'}, status=400)


class RoomDetailAPIView(RetrieveAPIView):
    queryset = Rooms.objects.all()
    serializer_class = RoomSerializer
    lookup_field = 'id'

@method_decorator(csrf_exempt, name='dispatch')
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = request.user.userprofile
        data = request.data

        print("Received PUT data:", data)  # Debug log

        profile.name = data.get('name', profile.name)
        profile.address = data.get('address', profile.address)
        profile.contact_no = data.get('contact_no', profile.contact_no)  # Fix this line
        profile.about_myself = data.get('about_myself', profile.about_myself)  # Fix this line
        profile.save()
        return Response({"message": "Profile updated successfully"})


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer