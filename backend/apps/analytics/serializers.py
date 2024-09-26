from rest_framework import serializers
from .models import AnalyticsData

class AnalyticsDataSerializer(serializers.ModelSerializer):
    total_listens = serializers.SerializerMethodField()
    average_listen_duration = serializers.SerializerMethodField()

    class Meta:
        model = AnalyticsData
        fields = [
            'id', 'podcast', 'episode', 'date', 'listens', 'unique_listeners',
            'average_listen_duration', 'total_listen_time', 'listener_retention_rate',
            'engagement_rate', 'social_shares', 'comments', 'likes', 'total_listens'
        ]
        read_only_fields = ['id', 'podcast', 'episode', 'date']

    def get_total_listens(self, obj):
        # Calculate the sum of listens across all time periods
        return obj.listens

    def get_average_listen_duration(self, obj):
        # Calculate the average listen duration across all listens
        if obj.listens > 0:
            return obj.total_listen_time / obj.listens
        return 0

    def validate_listens(self, value):
        if value < 0:
            raise serializers.ValidationError("Listens cannot be negative.")
        return value

    def validate_unique_listeners(self, value):
        if value < 0:
            raise serializers.ValidationError("Unique listeners cannot be negative.")
        return value

    def validate(self, data):
        if data.get('unique_listeners', 0) > data.get('listens', 0):
            raise serializers.ValidationError("Unique listeners cannot exceed total listens.")
        return data

# Human tasks to be completed:
# 1. Implement additional custom methods for calculating derived analytics metrics
# 2. Consider creating separate serializers for different analytics views (e.g., detailed vs. summary)
# 3. Implement serializer method fields for percentage calculations (e.g., retention rate as a percentage)
# 4. Add support for serializing time-based analytics data (e.g., listens over time)
# 5. Consider adding a nested serializer for related podcast or episode data if needed in API responses