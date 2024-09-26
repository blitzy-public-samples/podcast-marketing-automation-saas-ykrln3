from rest_framework import serializers
from .models import Podcast
import requests
import xml.etree.ElementTree as ET

class PodcastSerializer(serializers.ModelSerializer):
    episode_count = serializers.SerializerMethodField()

    class Meta:
        model = Podcast
        fields = [
            "id", "user", "title", "description", "cover_image", "rss_feed_url",
            "website", "created_at", "updated_at", "is_active", "category",
            "language", "episode_count"
        ]
        read_only_fields = ["id", "user", "created_at", "updated_at"]

    def validate_rss_feed_url(self, value):
        try:
            response = requests.get(value)
            response.raise_for_status()
            
            # Parse the XML content
            root = ET.fromstring(response.content)
            
            # Check if the root element is 'rss' or 'feed' (for Atom feeds)
            if root.tag not in ['rss', 'feed']:
                raise serializers.ValidationError("The provided URL is not a valid RSS feed.")
            
            return value
        except requests.RequestException:
            raise serializers.ValidationError("Unable to fetch the RSS feed. Please check the URL and try again.")
        except ET.ParseError:
            raise serializers.ValidationError("The provided URL does not contain valid XML content.")

    def validate_category(self, value):
        valid_categories = [
            "Arts", "Business", "Comedy", "Education", "Fiction", "Government",
            "History", "Health & Fitness", "Kids & Family", "Leisure", "Music",
            "News", "Religion & Spirituality", "Science", "Society & Culture",
            "Sports", "Technology", "True Crime", "TV & Film"
        ]
        if value not in valid_categories:
            raise serializers.ValidationError(f"Invalid category. Please choose from: {', '.join(valid_categories)}")
        return value

    def validate_language(self, value):
        valid_languages = ["en", "es", "fr", "de", "it", "pt", "ja", "ko", "zh"]
        if value not in valid_languages:
            raise serializers.ValidationError(f"Invalid language code. Please choose from: {', '.join(valid_languages)}")
        return value

    def get_episode_count(self, obj):
        return obj.episodes.count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = instance.user.username
        return representation

# Serializer for podcast creation with only required fields
class PodcastCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = ["title", "description", "rss_feed_url", "category", "language"]

    def create(self, validated_data):
        user = self.context['request'].user
        return Podcast.objects.create(user=user, **validated_data)