from django import forms
from django.utils import timezone

from .models import NaturalUser, LockedUser
from log.models import Record
from django.contrib.auth.models import User


class BlockingUserForm (forms.Form) :
    user_id = forms.IntegerField (required=True, widget=forms.HiddenInput ())
    lockedUser = forms.CharField (required=True, widget=forms.TextInput (attrs={'readonly' : 'readonly'}))
    reasons = forms.CharField (required=True, widget=forms.Textarea (), max_length=256)
    date = forms.DateField (required=True, widget=forms.DateInput (attrs={'readonly' : 'readonly'}))
    lockedBy = forms.CharField (required=True, widget=forms.TextInput (attrs={'readonly' : 'readonly'}))

    def save (self) :
        user = NaturalUser.objects.get (pk=self.cleaned_data ['user_id'])
        blockingUser = User.objects.get(username = self.cleaned_data ['lockedBy'])

        locked = LockedUser (lockedUser=user, reasons=self.cleaned_data ['reasons'], date=self.cleaned_data ['date'],
                             lockedBy=blockingUser)
        locked.save()

        firstComment = 'Usuario banneado ' + timezone.now.strftime ('%d/%m/%Y')
        secondComment = 'Se ha banneado al usuario ' + user.nickname

        newRecord = Record (firstComment=firstComment, secondComment=secondComment, typeRecord=2)
        newRecord.save ()

        user.isLocked = True
        user.save()