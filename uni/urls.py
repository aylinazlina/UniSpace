from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter
from django.urls import path, include


router = DefaultRouter()
router.register(r'bookings', BookingViewSet)


urlpatterns = [
    # Remove the api/uni/ prefix from all these paths

    path('rooms/', RoomListView.as_view(), name='room-list'),
    path('rooms/<uuid:id>/', RoomDetailAPIView.as_view(), name='room-detail'),
    path('', include(router.urls)),
    path('rooms/<int:room_id>/routines/', RoomRoutineView.as_view(), name='room-routines'),
    path('search/', search_rooms, name='search_rooms'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', login_view, name='login'),
    path('profile/', user_profile, name='user_profile'),

]