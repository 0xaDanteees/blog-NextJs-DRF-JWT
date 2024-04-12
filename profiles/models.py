from django.db import models

from django.contrib.auth.models import AbstractBaseUser,BaseUserManager,PermissionsMixin
import uuid

class UserManager(BaseUserManager):
   
    def create_user(self, email, password=None, **kwargs):
        
        if not email:
            raise ValueError("Enter a valid email...")
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()

        return user

    
    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password, **kwargs)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    uid = models.UUIDField(max_length=30, unique=True,default=uuid.uuid4, editable=False)
    email = models.EmailField("email", max_length=255, unique=True)
    username = models.CharField("username", max_length=255)
    avatar = models.ImageField(
        upload_to="avatar",  null=True, blank=True
    )
    caption = models.TextField("caption", null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    
    objects = UserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


    def __str__(self):
        return self.username
    
    @property

    def name(self):
        return f"{self.username}"