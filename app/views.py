from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Graf20

# Create your views here.


def index(request):
    return render(request, 'index.html')


def list_graf20s(_request):
    lgraf20s = list(Graf20.objects.values())
    data = {'lgraf20s': lgraf20s}
    return JsonResponse(data)
