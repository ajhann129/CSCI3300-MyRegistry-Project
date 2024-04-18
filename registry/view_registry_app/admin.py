from django.contrib import admin
from .models import Item

def mark_as_purchased(modeladmin, request, queryset):
    queryset.update(isPurchased=True)

def mark_as_unpurchased(modeladmin, request, queryset):
    queryset.update(isPurchased=False)

mark_as_purchased.short_description = "Mark selected items as purchased"
mark_as_unpurchased.short_description = "Mark selected items as unpurchased"

class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'quantity', 'isPurchased']
    actions = [mark_as_purchased, mark_as_unpurchased]

admin.site.register(Item, ItemAdmin)
