from django.contrib import admin
from .models import Platillo

@admin.register(Platillo)
class PlatilloAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'categoria', 'precio', 'disponible')
    list_filter = ('categoria', 'disponible')
    search_fields = ('nombre',)