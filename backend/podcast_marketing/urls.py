from django.urls import path, include
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', include('apps.users.urls')),
    path('api/podcasts/', include('apps.podcasts.urls')),
    path('api/episodes/', include('apps.episodes.urls')),
    path('api/marketing/', include('apps.marketing.urls')),
    path('api/analytics/', include('apps.analytics.urls')),
]

# TODO: Add URL pattern for API documentation (e.g., using drf-yasg for Swagger)
# TODO: Implement versioning in the API URLs if required (e.g., /api/v1/)
# TODO: Add custom error handling views (e.g., 404, 500 error pages)
# TODO: Add health check endpoint for monitoring purposes
# TODO: Review security implications of exposed endpoints and adjust as necessary