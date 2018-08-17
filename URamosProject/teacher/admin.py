from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):

    list_display = ('name', 'note', 'votes')
    search_fields = ('name', 'note', 'votes')
    readonly_fields = ('name', 'note', 'votes')