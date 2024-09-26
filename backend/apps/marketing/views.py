from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import MarketingContent, SocialMediaPost
from .serializers import MarketingContentSerializer, SocialMediaPostSerializer
from apps.episodes.models import Episode

class MarketingContentListCreateView(generics.ListCreateAPIView):
    serializer_class = MarketingContentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        episode_id = self.kwargs.get('episode_id')
        return MarketingContent.objects.filter(episode_id=episode_id).order_by('-created_at')

    def perform_create(self, serializer):
        episode_id = self.kwargs.get('episode_id')
        episode = Episode.objects.get(id=episode_id)
        serializer.save(episode=episode)

class MarketingContentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MarketingContentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return MarketingContent.objects.filter(episode__podcast__user=self.request.user)

class SocialMediaPostListCreateView(generics.ListCreateAPIView):
    serializer_class = SocialMediaPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        marketing_content_id = self.kwargs.get('marketing_content_id')
        return SocialMediaPost.objects.filter(marketing_content_id=marketing_content_id).order_by('scheduled_time')

    def perform_create(self, serializer):
        marketing_content_id = self.kwargs.get('marketing_content_id')
        marketing_content = MarketingContent.objects.get(id=marketing_content_id)
        serializer.save(marketing_content=marketing_content)

class SocialMediaPostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SocialMediaPostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SocialMediaPost.objects.filter(marketing_content__episode__podcast__user=self.request.user)

# TODO: Implement pagination for list views
# TODO: Add filtering options for list views
# TODO: Implement custom permission class for ownership checks
# TODO: Add validation for episode ownership
# TODO: Implement bulk operations view
# TODO: Add caching mechanism
# TODO: Implement logging for important actions
# TODO: Add custom action for approving content and scheduling posts