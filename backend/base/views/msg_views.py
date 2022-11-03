from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from ..models import *
from ..serializers import MessagesSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoomMessages(request, room_id):
    room = Rooms.objects.filter(id=room_id)
    if not room:
        return Response({'error': 'Комната не найдена.'}, status=status.HTTP_404_NOT_FOUND)
    messages = Messages.objects.filter(room=room_id).order_by('date')
    serializer = MessagesSerializer(messages, many=True)
    return Response(serializer.data)
