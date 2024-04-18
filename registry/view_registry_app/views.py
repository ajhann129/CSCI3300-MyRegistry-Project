from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponseRedirect
from django.contrib.auth import logout

from .models import Item
from .forms import ItemForm

from registry_app.models import Wishlist

# Create your views here.

def dashboard(request):
    if request.user.is_authenticated:  # Check if user is authenticated
        wishlist_id = request.POST.get('wishlist_id')
        if wishlist_id is not None:
            wishlist = get_object_or_404(Wishlist, pk=wishlist_id)
            registry_items = Item.objects.filter(wishlist=wishlist)
            form = ItemForm()
            return render(request, 'view_registry_app/dashboard.html', {'wishlist': wishlist, 'registry_items': registry_items, 'form': form})
        else:
            return redirect('registry_app:wishlist')
    else:
        return redirect('index')  # Redirect to the index page if user is not authenticated


def create_item(request, wishlist_id):
    wishlist = get_object_or_404(Wishlist, pk=wishlist_id)
    
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            item = form.save(commit=False)
            item.wishlist = wishlist
            item.save()
            # Redirect to the dashboard page for the current wishlist to avoid form resubmission
            return HttpResponseRedirect(request.path)
    else:
        form = ItemForm()
    
    # Render the dashboard template with the form and wishlist data
    registry_items = Item.objects.filter(wishlist=wishlist)
    return render(request, 'view_registry_app/dashboard.html', {'wishlist': wishlist, 'registry_items': registry_items, 'form': form})

def delete_item(request, item_id):
    if request.method == 'POST':
        item = get_object_or_404(Item, pk=item_id)
        item.delete()
        # Redirect back to the dashboard after deletion
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        # Handle GET requests for the delete_item view
        return HttpResponseRedirect('/')
    
def buy_item(request, item_id):
    if request.method == 'POST':
        # Retrieve the item object
        item = get_object_or_404(Item, pk=item_id)

        # Update the isPurchased property to True
        item.isPurchased = True
        item.save()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        # Handle GET requests for the buy_item view
        return HttpResponseRedirect('/')
    
def un_buy_item(request, item_id):
    if request.method == 'POST':
        # Retrieve the item object
        item = get_object_or_404(Item, pk=item_id)

        # Update the isPurchased property to False
        item.isPurchased = False
        item.save()

        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    else:
        # Handle GET requests for the buy_item view
        return HttpResponseRedirect('/')

def sign_out(request):
    logout(request)
    return redirect('index')
