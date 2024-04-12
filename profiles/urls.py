from django.urls import path
from profiles import views

urlpatterns = [
    path("profile/<username>/", views.UserDetailView.as_view()),
]