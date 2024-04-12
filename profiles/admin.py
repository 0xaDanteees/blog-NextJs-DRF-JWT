from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

class ProfileAdmin(UserAdmin):
    fieldsets = (
        (None, {
            "fields": (
                "uid",
                "username",
                "email",
                "password",
                "avatar",
                "caption",
                "is_active",
                "is_staff",
                "is_superuser",
                "updated_at",
                "created_at",
            )
        }),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "username",
                "email",
                "password1",
                "password2",
                "is_active",
                "is_staff",
                "is_superuser",
            ),
        }),
    )

    list_display = (
        "uid",
        "username",
        "email",
        "is_active",
        "updated_at",
        "created_at",
    )

    list_display_links = (
        "uid",
        "username",
        "email",
    )

    search_fields = (
        "uid",
        "email",
    )

    ordering = ("updated_at",)

    readonly_fields = (
        "updated_at",
        "created_at",
        "uid",
    )

    list_filter = ()
    

admin.site.register(User, ProfileAdmin)
