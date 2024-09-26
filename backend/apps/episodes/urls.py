from django.urls import path
from .views import EpisodeListCreateView, EpisodeRetrieveUpdateDestroyView

app_name = 'episodes'

urlpatterns = [
    path('<int:podcast_id>/episodes/', EpisodeListCreateView.as_view(), name='episode-list-create'),
    path('<int:podcast_id>/episodes/<int:pk>/', EpisodeRetrieveUpdateDestroyView.as_view(), name='episode-detail'),
]