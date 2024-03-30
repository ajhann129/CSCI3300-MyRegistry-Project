from django import forms

class WishlistForm(forms.Form):
    wishlist_name = forms.CharField(max_length=100)