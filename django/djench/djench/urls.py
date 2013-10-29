from django.conf.urls import patterns, include, url
from blog.views import json_post

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^api/posts/', json_post)
    # Examples:
    # url(r'^$', 'djench.views.home', name='home'),
    # url(r'^djench/', include('djench.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
