from django.db import models

# Create your models here.

class Post(models.Model):
    content = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.content

class Comment(models.Model):
    post = models.ForeignKey(Post)
    author = models.CharField(max_length=100)
    body = models.TextField()
    
    def __unicode__(self):
        return self.body