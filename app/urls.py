from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('list_graf20s/', views.list_graf20s, name='list_graf20s')
]