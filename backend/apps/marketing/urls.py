from django.urls import path
from .views import (
    MarketingContentListCreateView,
    MarketingContentRetrieveUpdateDestroyView,
    SocialMediaPostListCreateView,
    SocialMediaPostRetrieveUpdateDestroyView
)

app_name = 'marketing'

urlpatterns = [
    path('episodes/<int:episode_id>/marketing-content/', MarketingContentListCreateView.as_view(), name='marketing-content-list-create'),
    path('marketing-content/<int:pk>/', MarketingContentRetrieveUpdateDestroyView.as_view(), name='marketing-content-detail'),
    path('marketing-content/<int:marketing_content_id>/social-posts/', SocialMediaPostListCreateView.as_view(), name='social-post-list-create'),
    path('social-posts/<int:pk>/', SocialMediaPostRetrieveUpdateDestroyView.as_view(), name='social-post-detail'),
]

# TODO: Consider adding URL patterns for bulk operations on marketing content or social media posts
# TODO: Implement URL patterns for additional marketing-related functionalities (e.g., content approval, analytics)
# TODO: Add URL patterns for any custom actions or filters on marketing content or social media posts
# TODO: Review URL structure and consider versioning if necessary (e.g., /api/v1/marketing/)
# TODO: Implement proper URL patterns for pagination if not handled by DRF default settings
# TODO: Consider adding a URL pattern for retrieving all marketing content across episodes for a specific podcast