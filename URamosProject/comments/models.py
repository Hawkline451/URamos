from django.db import models
from django.utils import timezone


class Comment(models.Model):
	content = models.TextField(max_length=1024)
	date = models.DateField(default=timezone.now)
	isVisible = models.BooleanField(default=True)
	positivePoints = models.IntegerField(default=0)
	negativePoints = models.IntegerField(default=0)

class InvisibleComment(models.Model):
	comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
	reasons = models.TextField(max_length=1024)
	date = models.DateField(default=timezone.now)
