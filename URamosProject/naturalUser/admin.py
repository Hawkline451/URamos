from django.contrib import admin
from .models import NaturalUser, LockedUser

# Register your models here.
admin.site.register(NaturalUser)
admin.site.register(LockedUser)
admin.site.register(UserCourses)