from django.conf.urls import url, include
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.userAccounts import views

userAccounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
]

router = DefaultRouter()
router.register(r'^api/v1/userlist', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api/v1/userbulkedit/', views.UserBulkAPI.as_view()),
]

userAccounts_urlpatterns += urlpatterns