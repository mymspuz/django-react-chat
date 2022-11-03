from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import *
from ..serializers import RoomsSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRooms(request):
    rooms = Rooms.objects.all().order_by('id')
    serializer = RoomsSerializer(rooms, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoom(request, room_id):
    try:
        rooms = Rooms.objects.get(pk=room_id)
        serializer = RoomsSerializer(rooms, many=False)
        return Response(serializer.data)
    except Exception:
        return Response({'error': 'Комната не найдена.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRoom(request):
    # user = request.user
    data = request.data
    user = User.objects.get(pk=1)
    try:
        room = Rooms.objects.filter(name=data['name_room'])
        if room:
            return Response({'error': 'Комната уже существует.'}, status=status.HTTP_400_BAD_REQUEST)

        room = Rooms.objects.create(
            name=data['name_room'],
            user=user
        )
        return Response({'id': room.id, 'name': room.name}, status=status.HTTP_201_CREATED)
    except Exception:
        return Response({'error': 'Ошибка создания.'}, status=status.HTTP_400_BAD_REQUEST)
