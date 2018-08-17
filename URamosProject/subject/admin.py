from django.contrib import admin
from .models import Subject, Semester, Course

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    def curso(self, obj):
        return obj.code + ' - ' + obj.name

    list_filter = ('department',)
    list_display = ('curso', 'noteSubject', 'votes')
    search_fields = ('code', 'name')
    readonly_fields = ('code', 'department', 'name', 'votes', 'noteSubject', 'note')


@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    def semestre(self, obj):
        return obj.name + ' ' + str(obj.year)

    list_filter = ('name', 'year')
    list_display = ('semestre',)
    readonly_fields = ('name', 'year')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    def curso(self, obj):
        return obj.semester.name + ' ' + str(obj.semester.year) + ' - - ' + obj.subject.code + ' - ' + obj.subject.name

    list_filter = ('semester', 'section')
    list_display = ('curso', 'section', 'teacher', 'noteCourse', 'noteTeacher', 'votes')
    search_fields = ('subject__code', 'subject__name', 'teacher__name')
    readonly_fields = ('subject', 'semester', 'teacher', 'votes', 'noteCourse', 'noteTeacher', 'section')