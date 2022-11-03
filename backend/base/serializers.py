from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff']


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'is_staff', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class RoomsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ['id', 'name']


class MessagesSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=False)
    date = serializers.SerializerMethodField(read_only=False)
    time = serializers.SerializerMethodField(read_only=False)

    class Meta:
        model = Messages
        fields = ['id', 'room', 'message', 'user', 'date', 'time']

    def get_user(self, obj):
        return {
            'id': obj.user.id,
            'name': obj.user.username,
        }

    def get_date(self, obj):
        return obj.date.date()

    def get_time(self, obj):
        return obj.date.time()
