from rest_framework import serializers
from .models import Note, Like, Bookmark

class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')
    is_liked = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ['id', 'title', 'text', 'author_name', 'created_at', 'is_liked', 'is_saved', 'likes_count']

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Like.objects.filter(user=request.user, note=obj).exists()
        return False

    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Bookmark.objects.filter(user=request.user, note=obj).exists()
        return False
        
    def get_likes_count(self, obj):
        return obj.likes.count()