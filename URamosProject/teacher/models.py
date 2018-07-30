from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Teacher(models.Model):
	#user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	name = models.CharField(max_length=256, primary_key=True)
	votes = models.IntegerField (default=0)
	note = models.FloatField(default=0)
	def __str__(self):
		return self.name.lower()