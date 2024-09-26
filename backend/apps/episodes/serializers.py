from rest_framework import serializers
from .models import Episode
from django.core.exceptions import ValidationError
import magic
from django.conf import settings
from datetime import datetime

class EpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = [
            "id", "podcast", "title", "description", "audio_file", "duration",
            "publish_date", "created_at", "updated_at", "is_published",
            "episode_number", "season_number", "transcript", "show_notes"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_audio_file(self, value):
        # Check if the file is a valid audio format
        allowed_formats = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg']
        file_mime = magic.from_buffer(value.read(1024), mime=True)
        if file_mime not in allowed_formats:
            raise ValidationError("Invalid audio file format. Allowed formats are MP3, WAV, and OGG.")

        # Check if the file size is within acceptable limits
        if value.size > settings.MAX_AUDIO_FILE_SIZE:
            raise ValidationError(f"Audio file size exceeds the maximum allowed size of {settings.MAX_AUDIO_FILE_SIZE / (1024 * 1024)}MB.")

        # Reset file pointer
        value.seek(0)

        return value

    def validate(self, data):
        # Ensure episode_number is unique within the podcast
        podcast = data.get('podcast')
        episode_number = data.get('episode_number')
        if podcast and episode_number:
            if Episode.objects.filter(podcast=podcast, episode_number=episode_number).exclude(id=self.instance.id if self.instance else None).exists():
                raise ValidationError({"episode_number": "Episode number must be unique within the podcast."})

        # Validate publish_date is not in the past when creating a new episode
        publish_date = data.get('publish_date')
        if publish_date and not self.instance:
            if publish_date < datetime.now().date():
                raise ValidationError({"publish_date": "Publish date cannot be in the past for new episodes."})

        return data

    # TODO: Implement method to extract and set duration from audio file metadata

    # TODO: Implement method to handle show notes formatting (Markdown to HTML)

# TODO: Implement separate serializer for episode creation with required fields only