from django.http import JsonResponse
from django.shortcuts import render
from .models import Wishlist

# Create your views here.

def dashboard(request):
    return render(request, 'registry_app/dashboard.html')
    
def wishlist_view(request):
    return render(request, 'registry_app/wishlist.html')

def create_wishlist(request):
    if request.method == 'POST':
        wishlist_name = request.POST.get('wishlistName')
        user = request.user
        wishlist = Wishlist.objects.create(user=user, name=wishlist_name)
        return JsonResponse({'success': True, 'wishlist_id': wishlist.id})
    return JsonResponse({'success': False})

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