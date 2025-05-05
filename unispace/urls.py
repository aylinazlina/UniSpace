from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Django admin panel
    path('admin/', admin.site.urls),
    path('api/uni/', include('uni.urls')),

    # JWT auth endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # App APIs
    path('api/', include('chatbot.urls')),  # e.g. /api/chatbot/chat/
             # e.g. /api/uni/rooms/

    # Optional: if using DRF Browsable API and want to test in browser
    path('api-auth/', include('rest_framework.urls')),
]



# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve React frontend build
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]