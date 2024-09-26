from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Podcast(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='podcasts')
    title = models.CharField(max_length=255)
    description = models.TextField()
    cover_image = models.ImageField(upload_to='podcast_covers/', null=True, blank=True)
    rss_feed_url = models.URLField(max_length=500, unique=True)
    website = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    category = models.CharField(max_length=100, blank=True)
    language = models.CharField(max_length=50, default='en')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_episode_count(self):
        return self.episodes.count()

# Human tasks:
# TODO: Implement a method to fetch and update podcast data from the RSS feed
# TODO: Add validation for the RSS feed URL to ensure it's a valid podcast feed
# TODO: Consider adding fields for podcast statistics (e.g., subscriber count, total listens)
# TODO: Implement a method to generate a slug for SEO-friendly URLs
# TODO: Add indexes on frequently queried fields for performance optimization
# TODO: Consider implementing a custom manager for podcast-specific querysets
# TODO: Add a method to check if the podcast needs updating based on the RSS feed