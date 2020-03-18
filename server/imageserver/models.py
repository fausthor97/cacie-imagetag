from django.db import models

# Create your models here.

class Image(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    file = models.FileField(blank=False, null=False)
    markers = models.FileField(blank=True, null=True)
    title = models.CharField(max_length=100, blank=True, default='')

    def __str__(self):
        return self.file.name