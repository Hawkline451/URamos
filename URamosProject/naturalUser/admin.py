from django.conf.urls import url
from django.http import HttpResponseRedirect
from django.template.response import TemplateResponse
from django.utils import timezone
from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin
from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from .models import NaturalUser, LockedUser, UserCourses
from .forms import BlockingUserForm

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

    def lock_user (self, request, user_id, *args, **kwargs) :
        return self.process_action (
            request=request,
            user_id=user_id,
            action_form=BlockingUserForm,
            action_title='Bloquear Usuario',
        )

    def process_action (
            self,
            request,
            user_id,
            action_form,
            action_title
    ) :
        user = self.get_object (request, user_id)
        if request.method != 'POST' :
            form = action_form (
                initial={'user_id' : user_id, 'lockedUser' : user.user.first_name + ' ' + user.user.last_name,
                         'date' : timezone.now, 'lockedBy' : request.user.username})
        else :
            form = action_form (request.POST)
            if form.is_valid () :
                form.save ()
            else :
                self.message_user (request, 'Success')
            url = reverse('admin:{}_{}_change'.format(user._meta.app_label, user._meta.model_name),
                args=[user.pk],
                current_app=self.admin_site.name,
            )
            return HttpResponseRedirect (url)

        context = self.admin_site.each_context (request)
        context ['opts'] = self.model._meta
        context ['form'] = form
        context ['user'] = user
        context ['title'] = action_title
        return TemplateResponse (
            request,
            'admin/naturaluser/naturaluser_action.html',
            context,
        )

    def get_urls (self) :
        urls = super ().get_urls ()
        custom_urls = [
            url (
                r'^(?P<user_id>.+)/lock/$',
                self.admin_site.admin_view (self.lock_user),
                name='user-lock',
            ),
        ]
        return custom_urls + urls

    def bloquear (self, obj) :
        return format_html (
            '<a class="button" href="{}">Bloquear</a>',
            reverse ('admin:user-lock', args=[obj.pk]))

    def desbloquear (self, obj) :
        return format_html (
            '<a class="button" href="{}">Desbloquear</a>',
            reverse ('unlock', args=[obj.pk]))

    bloquear.short_description = 'Bloquear'
    bloquear.allow_tags = True

    desbloquear.short_description = 'Desloquear'
    desbloquear.allow_tags = True

    list_filter = ('isLocked', 'isModerator', 'isTeacher')
    list_display = ('usuario', 'nickname', 'isLocked', 'isModerator', 'isTeacher', 'teacherName', 'bloquear', 'desbloquear')
    search_fields = ('user__first_name', 'user__last_name', 'nickname')
    readonly_fields = ('isLocked', 'isTeacher', 'nickname', 'bloquear', 'desbloquear')

    inlines = (LockedUserInline, UserCoursesInline)