import uuid
from django.conf import settings
from django.db import models



class Blog(models.Model):
    uid = models.UUIDField(max_length=30, unique=True,default=uuid.uuid4, editable=False)
    author = models.ForeignKey(to='profiles.UserAccount', on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to="thumbnail", null=True, blank=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self):
        return f"{self.author.username}"