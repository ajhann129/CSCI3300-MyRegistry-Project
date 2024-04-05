from django.shortcuts import render, redirect
from .models import Item
from .forms import ItemForm

from registry_app.models import Wishlist

# Create your views here.

def dashboard(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlist_id')

        if wishlist_id is not None:
            try:
                wishlist = Wishlist.objects.get(pk=wishlist_id)
                registry_items = Item.objects.filter(wishlist=wishlist_id)
                return render(request, 'view_registry_app/dashboard.html', {'registry_items': registry_items})
            except Wishlist.DoesNotExist:
                # Redirect back to the wishlist page in the registry_app
                return redirect('registry_app:wishlist')
        else:
            return redirect('registry_app:wishlist')
    else:
        return redirect('registry_app:wishlist')
    

    # Your other logic for the dashboard view goes here

    return render(request, 'view_registry_app/dashboard.html', {'wishlist': wishlist})

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