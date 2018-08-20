from django.db import models
from django.utils import timezone

# Create your models here.

class Record(models.Model):
    date = models.DateField(default=timezone.now)
    firstComment = models.TextField(max_length=256)
    secondComment = models.TextField(max_length=256)
    typeRecord = models.IntegerField() # 0: comment, 1: block comment, 2: block user