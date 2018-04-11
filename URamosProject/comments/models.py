from django.db import models
from django.utils import timezone

# Create your models here.

class Coment(models.Model):
	content = models.TextField(max_length=1024)
	date = models.DateField(default=timezone.now)
	isVisible = models.BooleanField(default=True)
	positivePoints = models.IntegerField(default=0)
	negativePoints = models.IntegerField(default=0)