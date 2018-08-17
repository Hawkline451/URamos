from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from django.contrib.auth.models import User

from subject.models import Course
import random

# Create your models here.
class NaturalUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	nickname = models.TextField(max_length=128)
	isLocked = models.BooleanField(default=False, verbose_name='Bloqueado')
	isModerator = models.BooleanField(default=False, verbose_name='Moderador')
	isTeacher = models.BooleanField(default=False, verbose_name='Profesor')
	teacherName = models.TextField(max_length=128, null=True, blank=True, verbose_name='Nombre profesor')

	def setNickName(self):

		sounds = ['miau', 'guau', 'cuak cuak', 'muuuuu', 'pio pio', 'beeee',
			'auuuuh', 'hooo hoooo hoo', 'oink oink', 'cri cri', 'grrrrr']

		adjectives = ['consecuente', 'simple', 'feliz', 'habil', 'amable',
			'angelical', 'debil', 'fuerte', 'realista', 'libre', 'coherente',
			'brillante', 'grande', 'veloz', 'joven', 'perspicaz']

		nickname = random.choice(sounds)+" "+random.choice(adjectives)+" "+str(random.randint(10,99))

		while(NaturalUser.objects.filter(nickname=nickname)):
			nickname = random.choice(sounds)+" "+random.choice(adjectives)+" "+str(random.randint(10,99))
		
		self.nickname = nickname		
	
	def __str__(self):
		return self.nickname

class LockedUser(models.Model):
	lockedUser =  models.ForeignKey(NaturalUser, on_delete=models.CASCADE, verbose_name='Usuario')
	reasons = models.TextField(max_length=256, verbose_name='Motivo')
	date = models.DateField(default=timezone.now, verbose_name='Fecha')
	lockedBy = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Bloqueado por')
	def __str__(self):
		return self.lockedUser.nickname

class UserCourses(models.Model):
	user = models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)