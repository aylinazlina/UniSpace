from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect

from .models import *
from .forms import *
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from django.http import JsonResponse
import json
from .decorators import unauthenticated_user
from django.contrib.auth.models import Group

from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
# Create your views here.

@unauthenticated_user
def Registration(request):

    form = CreateUserForm()

    if request.method == 'POST':
        form = CreateUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')

            messages.success(request, "Account was created for " + username)
            return redirect('loginPage')

    context = {
        'form': form,
    }
    return render(request, template_name='Registration.html', context=context)



@unauthenticated_user
def loginPage(request):

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.info(request, "username or password incorrect")

    context = {

    }
    return render(request, template_name='login.html', context=context)


def logoutuser(request):
    logout(request)
    return redirect('loginPage')



def home(request):
    return render(request,template_name='home.html')


def rooms(request):
    ro = Rooms.objects.all()
    context ={
        'r':  ro,
    }
    return render(request,template_name='Rooms.html',context=context)

def roomDetails(request, pk):
    rDet = Rooms.objects.get(id=pk)
    context ={
        'rDetails':  rDet,
    }
    return render(request,template_name='Room_Details.html',context=context)


def routine(request, pk):

    routines = Routine.objects.filter(room__id=pk).order_by('day', 'start_time')
    context = {
        'rn': routines,
    }
    return render(request,   template_name ='Routine.html', context=context)





@login_required(login_url='loginPage')
def userProfile_add(request):

    if request.method == 'POST':
        form = userProfileForm(request.POST, request.FILES)
        if form.is_valid():
            form.instance.username = request.user.username  # Prefill username
            form.save()
            return redirect('userProfile')
    else:
        # Prefill the username field with the username of the logged-in user
        form = userProfileForm(initial={'username': request.user.username})

    context = {
        'form': form
    }
    return render(request,template_name='UserProfileForm.html', context=context)


def userProfile(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        profile = None

    context = {
        'profile': profile
    }
    return render(request, template_name='UserProfile.html', context=context)


def edit_profile(request):
    profile_instance = request.user.userprofile
    form = userProfileForm(instance=profile_instance)

    if request.method == 'POST':
        form = userProfileForm(request.POST, request.FILES, instance=profile_instance)
        if form.is_valid():
            form.save()
            return redirect('userProfile')  # Redirect to the profile page after editing

    context = {
        'form': form
    }
    return render(request, template_name='UserProfileForm.html', context=context)



def createRoom(request):
    form = RoomsForm()
    if request.method == 'POST':
        form =RoomsForm(request.POST,request.FILES)
        if form.is_valid():
            form.save()
            return redirect('rooms')
    context ={
        'form': form,
    }
    return render(request,template_name='Create_Room.html',context=context)


def updateRoom(request,pk):
    update =Rooms.objects.get(id=pk)
    form = RoomsForm(instance=update)
    if request.method == 'POST':
        form =RoomsForm(request.POST,request.FILES,instance=update)
        if form.is_valid():
            form.save()
            return redirect('rooms')
    context = {
        'form': form,
    }
    return render(request, template_name='Create_Room.html', context=context)


def deleteRoom(request,pk):
    delete = Rooms.objects.get(id=pk)
    if request.method == "POST":
        delete.delete()
        return redirect('rooms')
    context = {
        'r': delete,
    }
    return render(request, template_name='Delete.html', context=context)