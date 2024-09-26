from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer

class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()
        return user

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def perform_destroy(self, instance):
        # Perform any necessary cleanup operations
        # For example, you might want to anonymize user data instead of hard delete
        instance.is_active = False
        instance.email = f"deleted_{instance.id}@example.com"
        instance.username = f"deleted_user_{instance.id}"
        instance.save()

        # If you want to actually delete the user, uncomment the following line
        # instance.delete()

# TODO: Implement password change functionality
# TODO: Add email verification for new user registrations
# TODO: Implement password reset functionality
# TODO: Add social authentication views if required
# TODO: Implement user search functionality for admin purposes
# TODO: Add rate limiting to prevent abuse of registration and other sensitive endpoints
# TODO: Implement logging for important user actions (e.g., account creation, deletion)