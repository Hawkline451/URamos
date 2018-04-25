from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Create your models here.
class NaturalUser(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True)
	isLocked = models.BooleanField(default=False)

class LockedUser(models.Model):
	lockedUser =  models.ForeignKey(NaturalUser, on_delete=models.CASCADE)
	reasons = models.TextField(max_length=256)
	date = models.DateField(default=timezone.now)
	lockedBy = models.ForeignKey(User, on_delete=models.CASCADE)

