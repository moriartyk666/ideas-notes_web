from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Note, Like, Bookmark
from .serializers import NoteSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all().order_by('-created_at')
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    # Автоматически назначаем автора из текущего юзера
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def toggle_like(self, request, pk=None):
        note = self.get_object()
        like, created = Like.objects.get_or_create(user=request.user, note=note)
        if not created:
            like.delete()
            return Response({'status': 'unliked'})
        return Response({'status': 'liked'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def toggle_bookmark(self, request, pk=None):
        note = self.get_object()
        bookmark, created = Bookmark.objects.get_or_create(user=request.user, note=note)
        if not created:
            bookmark.delete()
            return Response({'status': 'unsaved'})
        return Response({'status': 'saved'})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def saved(self, request):
        bookmarks = Bookmark.objects.filter(user=request.user).values_list('note_id', flat=True)
        notes = Note.objects.filter(id__in=bookmarks).order_by('-created_at')
        serializer = self.get_serializer(notes, many=True)
        return Response(serializer.data)