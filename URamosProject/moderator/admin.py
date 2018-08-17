from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin
from django.contrib import admin
from .models import ModeratorSubjects, Moderator, UserList


class UserListsInline (SuperInlineModelAdmin, admin.TabularInline) :
    model = UserList

    def get_extra (self, request, obj, **kwargs) :
        return 0


class ModeratorsSubjectsInline (SuperInlineModelAdmin, admin.TabularInline) :
    model = ModeratorSubjects

    def get_extra (self, request, obj, **kwargs) :
        return 0


@admin.register (Moderator)
class ModeratorAdmin (SuperModelAdmin) :
    list_display = ('name', 'user')
    search_fields = ('name', 'user')

    inlines = (ModeratorsSubjectsInline, UserListsInline)
