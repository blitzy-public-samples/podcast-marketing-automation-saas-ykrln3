from rest_framework import serializers
from .models import MarketingContent, SocialMediaPost
from django.utils import timezone
from django.core.exceptions import ValidationError

class MarketingContentSerializer(serializers.ModelSerializer):
    character_count = serializers.SerializerMethodField()

    class Meta:
        model = MarketingContent
        fields = [
            "id",
            "episode",
            "content",
            "content_type",
            "platform",
            "created_at",
            "updated_at",
            "is_approved",
            "character_count"
        ]
        read_only_fields = [
            "id",
            "created_at",
            "updated_at"
        ]

    def get_character_count(self, obj):
        return len(obj.content)

    def validate(self, data):
        # Perform cross-field validations
        if data['content_type'] == 'tweet' and len(data['content']) > 280:
            raise serializers.ValidationError("Tweet content cannot exceed 280 characters.")

        # Ensure content is appropriate for the selected platform
        if data['platform'] == 'instagram' and data['content_type'] not in ['post', 'story', 'reel']:
            raise serializers.ValidationError("Invalid content type for Instagram.")

        # Add more platform-specific validations here

        return data

class SocialMediaPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialMediaPost
        fields = [
            "id",
            "marketing_content",
            "scheduled_time",
            "posted_time",
            "status",
            "post_url"
        ]
        read_only_fields = [
            "id",
            "posted_time",
            "status",
            "post_url"
        ]

    def validate_scheduled_time(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Scheduled time must be in the future.")
        return value

    def validate_marketing_content(self, value):
        if value.platform != self.initial_data.get('platform'):
            raise serializers.ValidationError("Marketing content platform must match the social media post platform.")
        return value

    # Method to generate preview text for social media posts
    def get_preview_text(self, obj):
        max_length = 100  # Adjust as needed
        if len(obj.marketing_content.content) <= max_length:
            return obj.marketing_content.content
        return obj.marketing_content.content[:max_length] + "..."

    # Method to suggest optimal posting times (placeholder implementation)
    def get_suggested_posting_time(self, obj):
        # This would typically involve complex logic based on platform analytics
        # For now, we'll return a placeholder suggestion
        return timezone.now().replace(hour=12, minute=0, second=0, microsecond=0)