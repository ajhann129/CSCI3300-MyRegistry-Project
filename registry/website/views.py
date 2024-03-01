from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return render(request, 'index.html')

def display(request):
    return render(request, 'display.html')

def createAccount(request):
    return render(request, 'create_acc.html')