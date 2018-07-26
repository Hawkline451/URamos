from django.contrib import admin
from .models import ModeratorSubjects, Moderator, UserList

# Register your models here.
admin.site.register(ModeratorSubjects)
admin.site.register(Moderator)
admin.site.register(UserList)