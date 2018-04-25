from django.db import models

# Create your models here.
class Class(models.Model):
	code = models.CharField(max_length=10, primary_key=True)
	name = models.CharField(max_length=256)
	note = models.FloatField(default=0)