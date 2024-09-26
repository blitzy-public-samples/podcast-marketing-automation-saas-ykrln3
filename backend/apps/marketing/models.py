from django.db import models
from django.utils import timezone
from apps.episodes.models import Episode

class MarketingContent(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('post', 'Social Media Post'),
        ('email', 'Email Content'),
        ('ad', 'Advertisement')
    ]
    PLATFORM_CHOICES = [
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('linkedin', 'LinkedIn')
    ]

    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='marketing_contents')
    content = models.TextField()
    content_type = models.CharField(max_length=50, choices=CONTENT_TYPE_CHOICES)
    platform = models.CharField(max_length=50, choices=PLATFORM_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_approved = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_content_type_display()} for {self.episode.title}"

class SocialMediaPost(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('posted', 'Posted'),
        ('failed', 'Failed')
    ]

    marketing_content = models.ForeignKey(MarketingContent, on_delete=models.CASCADE, related_name='social_media_posts')
    scheduled_time = models.DateTimeField()
    posted_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    post_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ['-scheduled_time']

    def __str__(self):
        return f"{self.marketing_content.get_platform_display()} - {self.get_status_display()} for {self.scheduled_time}"

    def mark_as_posted(self, post_url):
        self.status = 'posted'
        self.posted_time = timezone.now()
        self.post_url = post_url
        self.save()

# TODO: Implement a method in MarketingContent to generate content using AI or templates
# TODO: Add validation to ensure the platform in SocialMediaPost matches the platform in MarketingContent
# TODO: Implement a custom manager for filtering approved and unapproved marketing content
# TODO: Add a method to reschedule SocialMediaPosts
# TODO: Implement a mechanism to track engagement metrics for social media posts
# TODO: Consider adding a field for storing hashtags or mentions for social media posts
# TODO: Add indexes on frequently queried fields for performance optimization