from django.urls import path

from ..views import msg_views as views


urlpatterns = [
    path('<int:room_id>', views.getRoomMessages, name='get_messages'),
]
