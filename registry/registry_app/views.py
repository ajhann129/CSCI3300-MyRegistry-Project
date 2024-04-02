from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .models import Wishlist
from .forms import WishlistForm


# Create your views here.

def dashboard(request):
    return render(request, 'registry_app/dashboard.html')
    
def wishlist_view(request):
    return render(request, 'registry_app/wishlist.html')

def create_wishlist(request):
    if request.method == 'POST':
        form = WishlistForm(request.POST)
        if form.is_valid():
            wishlist_name = form.cleaned_data['wishlist_name']
            user = request.user
            wishlist = Wishlist.objects.create(user=user, name=wishlist_name)
            return redirect('registry_app:wishlist')  # Redirect to the dashboard
    else:
        form = WishlistForm()
    return render(request, 'registry_app/create_wishlist.html', {'form': form})

def delete_wishlist(request, wishlist_id):
    # Retrieve the wishlist object from the database or return a 404 error if not found
    wishlist = get_object_or_404(Wishlist, pk=wishlist_id)
    
    # Ensure that the current user owns the wishlist
    if wishlist.user == request.user:
        # Delete the wishlist from the database
        wishlist.delete()
        # Return a success JSON response
        return JsonResponse({'success': True})
    else:
        # Return a failure JSON response if the user does not own the wishlist
        return JsonResponse({'success': False})

def load_wishlists(request):
    if request.method == 'GET':
        user = request.user
        # Retrieve wishlists associated with the current user
        wishlists = Wishlist.objects.filter(user=user)
        # Serialize wishlist data into JSON format
        data = [{'id': wishlist.id, 'name': wishlist.name} for wishlist in wishlists]
        # Return JSON response with wishlist data
        return JsonResponse({'wishlists': data})
    else:
        # Handle invalid requests (e.g., POST requests)
        return JsonResponse({'error': 'Invalid request method'}, status=400)