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
