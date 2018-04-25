from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Teacher(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	note = models.FloatField(default=0)
