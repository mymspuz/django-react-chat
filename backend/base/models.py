from django.contrib.auth.models import User
from django.db import models


class Rooms(models.Model):
    name = models.CharField(max_length=50, unique=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Пользователь')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Комната'
        verbose_name_plural = 'Комнаты'


class Messages(models.Model):
    room = models.ForeignKey(Rooms, on_delete=models.PROTECT, verbose_name='Комната')
    message = models.CharField(max_length=150, verbose_name='Сообщение')
    user = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Пользователь')
    date = models.DateTimeField(verbose_name='Дата создания сообщения')

    def __str__(self):
        return f'{self.room} - {self.user}'

    class Meta:
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'
