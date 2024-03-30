from django.http import JsonResponse
from django.shortcuts import render, redirect
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
            return redirect('registry_app:dashboard')  # Redirect to the dashboard
    else:
        form = WishlistForm()
    return render(request, 'registry_app/create_wishlist.html', {'form': form})

def delete_wishlist(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlistId')
        try:
            wishlist = Wishlist.objects.get(pk=wishlist_id, user=request.user)
            wishlist.delete()
            return JsonResponse({'success': True})
        except Wishlist.DoesNotExist:
            return JsonResponse({'success': False})
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