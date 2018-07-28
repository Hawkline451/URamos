from login.serializers import UserSerializer
from naturalUser.models import NaturalUser
from naturalUser.serializers import NaturalUserSerializer


def my_jwt_response_handler(token, user=None, request=None):
	natU = NaturalUserSerializer(NaturalUser.objects.get(user=request.user))
	return {
		'token': token,
		'user': natU.data
	}