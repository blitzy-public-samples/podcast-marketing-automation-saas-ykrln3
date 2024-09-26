from django.urls import path
from .views import PodcastAnalyticsView, EpisodeAnalyticsView, AnalyticsOverviewView

app_name = 'analytics'

urlpatterns = [
    path('podcasts/<int:podcast_id>/', PodcastAnalyticsView.as_view(), name='podcast-analytics'),
    path('episodes/<int:episode_id>/', EpisodeAnalyticsView.as_view(), name='episode-analytics'),
    path('overview/', AnalyticsOverviewView.as_view(), name='analytics-overview'),
]

# TODO: Consider adding URL patterns for more granular analytics views (e.g., listener demographics, geographic distribution)
# TODO: Implement URL patterns for analytics data export functionality if required
# TODO: Add URL patterns for any custom analytics reports or dashboards
# TODO: Ensure all URL patterns have appropriate names for reverse URL lookup
# TODO: Review URL structure and consider versioning if necessary (e.g., /api/v1/analytics/)
# TODO: Implement proper URL patterns for pagination if not handled by DRF default settings
# TODO: Consider adding a URL pattern for real-time analytics updates if websocket functionality is implemented