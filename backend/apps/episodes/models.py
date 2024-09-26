from django.db import models
from django.utils import timezone
from apps.podcasts.models import Podcast
from django.urls import reverse

class Episode(models.Model):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE, related_name='episodes')
    title = models.CharField(max_length=255)
    description = models.TextField()
    audio_file = models.FileField(upload_to='episode_audio/')
    duration = models.DurationField()
    publish_date = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False)
    episode_number = models.PositiveIntegerField(null=True, blank=True)
    season_number = models.PositiveIntegerField(null=True, blank=True)
    transcript = models.TextField(blank=True)
    show_notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-publish_date", "episode_number"]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('episode-detail', kwargs={'pk': self.pk})

# TODO: Implement a method to generate and update the transcript field using a speech-to-text service
# TODO: Add validation to ensure episode_number is unique within a podcast
# TODO: Implement a custom manager for episode-specific querysets (e.g., published episodes)
# TODO: Add indexes on frequently queried fields for performance optimization
# TODO: Consider adding fields for episode-specific analytics (e.g., listen count, engagement metrics)
# TODO: Implement a method to handle audio file processing (e.g., format conversion, metadata extraction)
# TODO: Add a field and method for managing episode artwork if different from podcast artwork