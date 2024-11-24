from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Task
from.serializers import Taskserializers

def home(request):
    return render(request, 'index.html')

class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = Taskserializers
