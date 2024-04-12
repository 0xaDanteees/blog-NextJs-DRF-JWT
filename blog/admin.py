from django.contrib import admin
from django.contrib.admin import ModelAdmin
from blog.models import Blog


class BlogAdmin(ModelAdmin):

    list_display = ("uid", "author", "title", "updated_at", "created_at")

    list_display_links = ("uid", "author", "title")

    ordering = ("-updated_at","title","author",)

    readonly_fields = ("uid", "updated_at", "created_at")


admin.site.register(Blog, BlogAdmin)