from django.urls import path
from .views import PodcastListCreateView, PodcastRetrieveUpdateDestroyView

app_name = 'podcasts'

urlpatterns = [
    path('', PodcastListCreateView.as_view(), name='podcast-list-create'),
    path('<int:pk>/', PodcastRetrieveUpdateDestroyView.as_view(), name='podcast-detail'),
]