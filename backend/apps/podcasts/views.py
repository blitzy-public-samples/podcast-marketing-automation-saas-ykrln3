from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Podcast
from .serializers import PodcastSerializer

class PodcastListCreateView(generics.ListCreateAPIView):
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return podcasts filtered by the authenticated user
        return Podcast.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Set the user of the new podcast to the authenticated user
        serializer.save(user=self.request.user)

class PodcastRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PodcastSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Return podcasts filtered by the authenticated user
        return Podcast.objects.filter(user=self.request.user)

# TODO: Implement pagination for the podcast list view to handle large numbers of podcasts
# TODO: Add filtering and sorting options for the podcast list view
# TODO: Implement a custom permission class to ensure users can only modify their own podcasts
# TODO: Add validation to check if the user has reached their podcast limit before creating a new one
# TODO: Implement a view for bulk operations on podcasts (e.g., bulk delete)
# TODO: Add caching mechanism for frequently accessed podcast data
# TODO: Implement logging for important podcast-related actions (creation, deletion, etc.)