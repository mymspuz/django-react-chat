from django.urls import path

from ..views import rooms_views as views


urlpatterns = [
    path('', views.getRooms, name='get_rooms'),
    path('<int:room_id>', views.getRoom, name='get_room'),
    path('add', views.addRoom, name='add_room')
]
