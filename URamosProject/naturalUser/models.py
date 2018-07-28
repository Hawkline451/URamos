from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

from subject.models import Course
import random

# Create your models here.
class NaturalUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	nickname = models.TextField(max_length=128)
	isLocked = models.BooleanField(default=False)
	isModerator = models.BooleanField(default=False)
	isTeacher = models.BooleanField(default=False)

	def setNickName(self):
		sounds = ['miau', 'guau', 'cuak cuak', 'muuuuu', 'pio pio', 'beeee',
			'auuuuh', 'qui qui ri quii', 'oink oink', 'cri cri', 'grrrrr']

		adjectives = ['consecuente', 'simple', 'feliz', 'habil', 'amable',
			'angelical', 'debil', 'fuerte', 'realista', 'libre', 'coherente',
			'brillante', 'grande', 'veloz', 'joven', 'perspicaz']

		this.nickname = random.choice(sounds)+" "+random.choice(adjectives)+" "+str(random.randint(10,99))
		
	
	def __str__(self):
		return self.user.name

class LockedUser(models.Model):
	lockedUser =  models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	reasons = models.TextField(max_length=256)
	date = models.DateField(default=timezone.now)
	lockedBy = models.ForeignKey(User, on_delete=models.CASCADE)
	def __str__(self):
		return self.lockedUser.user.name

class UserCourses(models.Model):
	user = models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	course = models.ForeignKey(Course, on_delete=models.CASCADE)