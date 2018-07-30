from django.contrib import admin
from .models import Subject, Semester, Course
# Register your models here.
admin.site.register(Subject)
admin.site.register(Semester)
admin.site.register(Course)