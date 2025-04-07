from django.forms import ModelForm
from .models import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields =['username','email' ,'password1','password2']




class userProfileForm(ModelForm):
    class Meta:
        model=UserProfile
        fields = '__all__'


class RoomsForm(ModelForm):
    class Meta:
        model = Rooms
        fields = '__all__'