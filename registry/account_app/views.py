from django.shortcuts import render, redirect
from django.contrib.auth.forms import  AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CreateAccountForm

def index(request):
    return render(request, 'account_app/index.html')

def create_account(request):
    if request.method == 'POST':
        form = CreateAccountForm(request.POST)
        if form.is_valid():
            # This saves both User and UserProfile
            user = form.save() 
            # Log the user in after creating the account 
            login(request, user)  
            return redirect('dashboard')  
    else:
        # If the request method is not POST, create an empty CreateAccountForm instance
        form = CreateAccountForm()

    return render(request, 'account_app/create_account.html', {'form': form})

def signin(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
             # If authentication is successful, log in the user and redirect to the 'dashboard'
            if user is not None:
                login(request, user)
                return redirect('dashboard')
    else:
        # If the request method is not POST, create an empty AuthenticationForm instance
        form = AuthenticationForm()
    return render(request, 'account_app/signin.html', {'form': form})