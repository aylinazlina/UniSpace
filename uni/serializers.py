from rest_framework import serializers
from .models import *


class RegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match"})

        # Validate email uniqueness if required
        email = data.get('email')
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Email already in use"})

        return data

    def create(self, validated_data):
        try:
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data.get('email', ''),
                password=validated_data['password1']
            )
            # Explicitly set user as active
            user.is_active = True
            user.save()
            return user
        except Exception as e:
            # Log the error for debugging
            print(f"Error creating user: {str(e)}")
            raise serializers.ValidationError(f"Failed to create user: {str(e)}")


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    """
    Serializer for Room model
    """

    class Meta:
        model = Rooms
        fields = '__all__'

    def get_room_pic(self, obj):
        if obj.room_pic:
            return obj.room_pic.url
        return ''




class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'



