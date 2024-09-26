from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from apps.podcasts.models import Podcast
from apps.episodes.models import Episode
from .models import AnalyticsData
from .serializers import AnalyticsDataSerializer
from django.db.models import Sum, Avg
from django.utils import timezone
from datetime import timedelta

class PodcastAnalyticsView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AnalyticsDataSerializer

    def get_object(self):
        podcast_id = self.kwargs.get('podcast_id')
        podcast = generics.get_object_or_404(Podcast, id=podcast_id, user=self.request.user)
        
        # Aggregate analytics data for the podcast
        aggregated_data = AnalyticsData.objects.filter(podcast=podcast).aggregate(
            total_listens=Sum('listens'),
            total_unique_listeners=Sum('unique_listeners'),
            avg_listen_duration=Avg('average_listen_duration'),
            total_shares=Sum('social_shares'),
            total_comments=Sum('comments'),
            total_likes=Sum('likes')
        )
        
        # Create an AnalyticsData instance with aggregated data
        analytics_data = AnalyticsData(
            podcast=podcast,
            listens=aggregated_data['total_listens'] or 0,
            unique_listeners=aggregated_data['total_unique_listeners'] or 0,
            average_listen_duration=aggregated_data['avg_listen_duration'] or 0,
            social_shares=aggregated_data['total_shares'] or 0,
            comments=aggregated_data['total_comments'] or 0,
            likes=aggregated_data['total_likes'] or 0
        )
        
        return analytics_data

class EpisodeAnalyticsView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AnalyticsDataSerializer

    def get_object(self):
        episode_id = self.kwargs.get('episode_id')
        episode = generics.get_object_or_404(Episode, id=episode_id, podcast__user=self.request.user)
        
        # Retrieve or create analytics data for the episode
        analytics_data, created = AnalyticsData.objects.get_or_create(
            episode=episode,
            defaults={
                'podcast': episode.podcast,
                'date': timezone.now().date()
            }
        )
        
        return analytics_data

class AnalyticsOverviewView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AnalyticsDataSerializer

    def get_queryset(self):
        user_podcasts = Podcast.objects.filter(user=self.request.user)
        
        # Aggregate analytics data across all user's podcasts
        aggregated_data = AnalyticsData.objects.filter(podcast__in=user_podcasts).aggregate(
            total_listens=Sum('listens'),
            total_unique_listeners=Sum('unique_listeners'),
            avg_listen_duration=Avg('average_listen_duration'),
            total_shares=Sum('social_shares'),
            total_comments=Sum('comments'),
            total_likes=Sum('likes')
        )
        
        # Create an AnalyticsData instance with aggregated data
        overview_data = AnalyticsData(
            listens=aggregated_data['total_listens'] or 0,
            unique_listeners=aggregated_data['total_unique_listeners'] or 0,
            average_listen_duration=aggregated_data['avg_listen_duration'] or 0,
            social_shares=aggregated_data['total_shares'] or 0,
            comments=aggregated_data['total_comments'] or 0,
            likes=aggregated_data['total_likes'] or 0
        )
        
        return [overview_data]  # Return as a list for ListAPIView

# TODO: Implement data filtering by date range
# TODO: Implement caching mechanism for analytics data
# TODO: Add rate limiting to prevent abuse
# TODO: Implement more detailed analytics (demographics, geography)
# TODO: Add support for data export (CSV, PDF)
# TODO: Consider implementing real-time updates with websockets