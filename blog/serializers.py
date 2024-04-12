from rest_framework import serializers
from profiles.serializers import UserSerializer
from core.utils import Base64ImageField
from blog.models import Blog
import uuid


class BlogSerializer(serializers.ModelSerializer):
    
    uid = serializers.UUIDField(read_only=True)
    author = UserSerializer(read_only=True)
    thumbnail = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)

    class Meta:
        model = Blog
        fields = "__all__"