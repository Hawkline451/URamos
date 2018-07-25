from django.contrib import admin
from .models import Comment, InvisibleComment, OldComment, EditedList

# Register your models here.
admin.site.register(Comment)
admin.site.register(InvisibleComment)
#admin.site.register(OldComment)
#admin.site.register(EditedList)