from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "profile_picture",
            "bio",
            "website",
            "date_joined",
            "is_active"
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
                "min_length": 8
            }
        }

    def create(self, validated_data):
        # Extract password from validated_data
        password = validated_data.pop('password', None)
        
        # Create user instance without password
        user = User(**validated_data)
        
        # Set password using set_password method
        if password:
            user.set_password(password)
        
        # Save user instance
        user.save()
        
        # Return created user
        return user

    def update(self, instance, validated_data):
        # Check if password is in validated_data
        password = validated_data.pop('password', None)
        
        # If password present, update using set_password
        if password:
            instance.set_password(password)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Save user instance
        instance.save()
        
        # Return updated user
        return instance