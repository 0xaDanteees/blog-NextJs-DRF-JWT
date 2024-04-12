from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ModelViewSet
from .models import Blog
from .serializers import BlogSerializer

#since we using jwt, we allowing anyone who has a valid token to post

class BlogsView(ListAPIView):

    queryset = Blog.objects.all().order_by("-updated_at")
    serializer_class = BlogSerializer
    permission_classes = (AllowAny,)


class BlogDetailView(RetrieveAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = (AllowAny,)

    lookup_field = "uid" 
    #when serching for blogs maybe there are many blogs with same name
    #so better to do this way



class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = "uid"


    def perform_create(self, serializer, **kwargs):
 
        serializer.save(author=self.request.user)