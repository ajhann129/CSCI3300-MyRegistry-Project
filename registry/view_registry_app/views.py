from django.shortcuts import render, redirect
from .models import Item
from .forms import ItemForm

# Create your views here.

def dashboard(request):
    return render(request, 'view_registry_app/dashboard.html')

def create_item(request, wishlist_id):
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            item = form.save(commit=False)
            item.wishlist_id = wishlist_id
            item.save()
            return redirect('view_registry_app:dashboard')  # Redirect to the dashboard
    else:
        form = ItemForm()
    return render(request, 'view_registry_app/create_item.html', {'form': form})