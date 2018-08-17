from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin
from django.contrib import admin
from .models import NaturalUser, LockedUser, UserCourses

class LockedUserInline(SuperInlineModelAdmin, admin.TabularInline):
    model = LockedUser
    can_delete = False

    readonly_fields = ('lockedUser', 'reasons', 'date', 'lockedBy')

    def get_extra(self, request, obj, **kwargs):
        return 0

class UserCoursesInline(SuperInlineModelAdmin, admin.TabularInline):
    model = UserCourses
    can_delete = False

    readonly_fields = ('user', 'course')

    def get_extra(self, request, obj, **kwargs):
        return 0

@admin.register(NaturalUser)
class NaturalUserAdmin(SuperModelAdmin):
    def usuario(self, obj):
        return obj.user.first_name + ' ' + obj.user.last_name

    list_filter = ('isLocked', 'isModerator', 'isTeacher')
    list_display = ('usuario', 'nickname', 'isLocked', 'isModerator', 'isTeacher', 'teacherName')
    search_fields = ('user__first_name', 'user__last_name', 'nickname')
    readonly_fields = ('nickname',)

    inlines = (LockedUserInline, UserCoursesInline)