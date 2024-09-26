from django.urls import path
from .views import UserRegistrationView, UserProfileView, UserDeleteView

app_name = 'users'

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('delete/', UserDeleteView.as_view(), name='user-delete'),
]

# TODO: Add URL pattern for password change functionality
# TODO: Implement URL for email verification if required
# TODO: Add URL for password reset functionality
# TODO: Consider adding URLs for social authentication if needed
# TODO: Implement URL for user search functionality (for admin purposes)
# TODO: Ensure all URL patterns have appropriate names for reverse URL lookup
# TODO: Review URL structure and consider versioning if necessary (e.g., /api/v1/users/)