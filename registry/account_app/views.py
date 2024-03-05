from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate

def index(request):
    return render(request, 'account_app/index.html')

from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CreateAccountForm

def create_account(request):
    if request.method == 'POST':
        form = CreateAccountForm(request.POST)
        if form.is_valid():
            user = form.save()  # This saves both User and UserProfile
            login(request, user)  # Log the user in after creating the account
            return redirect('index')  # Redirect to the index page or any other page
    else:
        form = CreateAccountForm()

    return render(request, 'account_app/create_account.html', {'form': form})

def signin(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = AuthenticationForm()
    return render(request, 'account_app/signin.html', {'form': form})