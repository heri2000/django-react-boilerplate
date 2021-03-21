from django.conf.urls import url, include 
from rest_framework.routers import DefaultRouter
from apps.notes.views import NoteViewSet

router = DefaultRouter()
router.register("notes", NoteViewSet, basename="notes")
notes_urlpatterns = [url("api/v1/", include(router.urls))]

"""
GET list of notes: /api/v1/notes,
GET one note with id: /api/v1/notes/1/ (for id = 1),
create note, the POST request at /api/v1/notes/ with note JSON containg content field,
delete note with DELETE request at /api/v1/notes/1/ (for id = 1),
partial note update with PATCH request at /api/v1/notes/1/ (for id = 1),
full note update with PUT request at /api/v1/notes/1/ (for id = 1).
"""