from rest_framework import generics
from imageserver.models import Image
from imageserver.serializers import ImageSerializer
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework import status

# images
class ImageList(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer 
    parser_class = (FileUploadParser)

    def post(self, request, *args, **kwargs):
      file_serializer = ImageSerializer(data=request.data)
      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ImageDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer 
