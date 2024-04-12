from django.urls import path, include
from rest_framework import routers
from blog import views

router = routers.DefaultRouter()
router.register("dropz", views.BlogViewSet)


urlpatterns = [

    path("blogs/", views.BlogsView.as_view()),

    path("blog/<uid>/", views.BlogDetailView.as_view()),
    path("", include(router.urls)),
]