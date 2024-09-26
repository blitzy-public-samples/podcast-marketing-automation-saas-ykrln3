from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    website = models.URLField(max_length=200, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    def get_full_name(self):
        """
        Returns the user's full name.
        """
        full_name = f"{self.first_name} {self.last_name}"
        return full_name.strip()

    def get_short_name(self):
        """
        Returns the user's short name (first name).
        """
        return self.first_name

    # TODO: Implement custom user manager if needed for specific user creation logic
    # TODO: Add any additional fields that may be required for the podcast marketing platform
    # TODO: Implement custom methods for user-specific functionality (e.g., get_podcasts)
    # TODO: Set up signals for user-related actions (e.g., post_save for profile creation)
    # TODO: Ensure proper indexing on frequently queried fields
    # TODO: Implement any necessary data validation or clean methods
    # TODO: Consider adding a method to check user subscription status if applicable