from rest_framework import serializers

from .models import NaturalUser

class NaturalUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = NaturalUser
		fields = ('nickname','isLocked','isModerator', 'isTeacher', 'teacherName')