from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Teacher(models.Model):
	#user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	name = models.CharField(max_length=256, primary_key=True, verbose_name='Nombre')
	votes = models.IntegerField (default=0, verbose_name='votos')
	note = models.FloatField(default=0, verbose_name='nota')
	def __str__(self):
		return self.name.lower()

