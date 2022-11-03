from django.urls import path

from ..views import auth_views as views


urlpatterns = [
    path('signin/', views.MyTokenObtainPairView.as_view(), name='signin'),
]
