from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Episode
from .serializers import EpisodeSerializer
from apps.podcasts.models import Podcast

class EpisodeListCreateView(generics.ListCreateAPIView):
    serializer_class = EpisodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Get the podcast_id from the URL kwargs
        podcast_id = self.kwargs.get('podcast_id')
        # Return episodes filtered by the specified podcast and ordered by publish date
        return Episode.objects.filter(podcast_id=podcast_id).order_by('-publish_date')

    def perform_create(self, serializer):
        # Get the podcast_id from the URL kwargs
        podcast_id = self.kwargs.get('podcast_id')
        # Retrieve the Podcast instance
        podcast = Podcast.objects.get(id=podcast_id)
        # Set the podcast of the new episode to the retrieved Podcast instance
        serializer.save(podcast=podcast)

class EpisodeRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EpisodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return episodes filtered by podcasts owned by the authenticated user
        return Episode.objects.filter(podcast__user=self.request.user)

# Human tasks to be implemented:
# TODO: Implement pagination for the episode list view to handle large numbers of episodes
# TODO: Add filtering options for the episode list view (e.g., by publish date, is_published status)
# TODO: Implement a custom permission class to ensure users can only modify episodes of their own podcasts
# TODO: Add validation to check if the episode's podcast belongs to the authenticated user before allowing modifications
# TODO: Implement a view for bulk operations on episodes (e.g., bulk delete, bulk update publish status)
# TODO: Add caching mechanism for frequently accessed episode data
# TODO: Implement logging for important episode-related actions (creation, deletion, publishing, etc.)
# TODO: Consider adding a custom action for publishing/unpublishing episodes