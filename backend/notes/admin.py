from django.contrib import admin

# Register your models here.

from .models import Note, Like, Bookmark

admin.site.register(Note)
admin.site.register(Like)
admin.site.register(Bookmark)