# Create your views here.

from django.utils.formats import date_format
from django.http import HttpResponse
from blog.models import Post
import json

def json_post(request):
    try:
        post_limit = int(request.GET.get('limit', 100))
    except ValueError:
        post_limit = 100
    
    latest_posts = Post.objects.all().order_by('-pub_date')[:post_limit]
	
    posts = [{
        'content': p.content,
        'pub_date': date_format(p.pub_date, 'DATETIME_FORMAT'),
        'comments': [{
            'author': c.author,
            'body': c.body
        } for c in p.comment_set.all()],
    } for p in latest_posts]

    return HttpResponse(json.dumps(posts), content_type='application/json')