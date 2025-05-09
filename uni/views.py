from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, permission_classes, parser_classes



from rest_framework import status
from rest_framework.generics import RetrieveAPIView
from rest_framework import serializers
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

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


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def user_profile(request):
    user = request.user

    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = None

    if request.method == 'GET':
        if profile:
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data)
        else:
            return Response({"detail": "Profile not found."}, status=404)

    elif request.method == 'POST':
        if profile:
            # Update existing profile
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
        else:
            # Create new profile, manually set the user
            serializer = UserProfileSerializer(data=request.data)

        if serializer.is_valid():
            if not profile:
                serializer.save(user=user)  # manually attach user
            else:
                serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


class RoomRoutineView(APIView):
    """API View to get routines for a specific room"""

    def get(self, request, room_id):
        try:
            room = Rooms.objects.get(id=room_id)
            routines = Routine.objects.filter(room=room).order_by('day', 'start_time')
            serializer = RoutineSerializer(routines, many=True)
            return Response(serializer.data)
        except Rooms.DoesNotExist:
            return Response(
                {"error": "Room not found"},
                status=status.HTTP_404_NOT_FOUND
            )



