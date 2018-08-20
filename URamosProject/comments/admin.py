from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin
from django.contrib import admin
from .models import Comment, InvisibleComment, OldComment, EditedList

class CommentEditedInline(SuperInlineModelAdmin, admin.TabularInline):
    model = EditedList
    can_delete = False

    def get_extra(self, request, obj, **kwargs):
        return 0

class InvisibleCommentsInline(SuperInlineModelAdmin, admin.TabularInline):
    model = InvisibleComment
    can_delete = False

    readonly_fields = ('reasons', 'date')

    def get_extra(self, request, obj, **kwargs):
        return 0


@admin.register(Comment)
class CommentAdmin(SuperModelAdmin):
    def curso(self, obj):
        return obj.course.subject

    def semestre(self, obj):
        return obj.course.semester.name + ' ' + str(obj.course.semester.year)

    search_fields = ('course__subject__name', 'course__subject__code')
    list_display = ('date', 'semestre', 'curso', 'user', 'isVisible', 'isEdited', 'ranking')
    list_filter = ('isVisible', 'isEdited')
    readonly_fields = ('course',)

    inlines = (InvisibleCommentsInline, CommentEditedInline)

admin.site.register(OldComment)