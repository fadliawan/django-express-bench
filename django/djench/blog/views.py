# Create your views here.

from django.utils.formats import date_format
from django.http import HttpResponse
from blog.models import Post
import json

def json_post(request):
    post_limit = request.GET.get('limit', 1000)
	
    posts = [{
        'content': p.content,
        'pub_date': date_format(p.pub_date, 'DATETIME_FORMAT'),
        'comments': [{
            'author': c.author,
            'body': c.body
        } for c in p.comment_set.all()],
    } for p in Post.objects.all()[:post_limit]]

    return HttpResponse(json.dumps(posts), content_type='application/json')