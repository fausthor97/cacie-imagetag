import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';

const ZOOM_VALUE = 250;

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss'],
})

export class ImageCanvasComponent implements OnInit {
  @Input() imageUrl;
  @ViewChild('imageTag', { static: false }) imgRef: ElementRef<HTMLImageElement>;
  @ViewChild('imageContainer', { static: false }) imgContRef: ElementRef<HTMLImageElement>;
  public image: Image;
  public imageHasLoaded: boolean;
  public isDraggable: boolean;

  constructor() { }

  ngOnInit() {
    this.image = new Image(this.imageUrl);
  }

  onImageLoaded() {
    this.image.setInitialDimensions(
      this.imgRef.nativeElement.naturalWidth,
      this.imgRef.nativeElement.naturalHeight,
      this.imgRef.nativeElement.width,
      this.imgRef.nativeElement.height,
    );
    $('.image-container').draggable();
    $('.image-container').draggable('disable');
    this.imageHasLoaded = true;
    $('#data').draggable();
  }

  onImageClicked(click) {
    if (!this.isDraggable) {
      this.image.onClick(click);
    }
  }

  draggableToggle() {
    if (this.isDraggable) {
      $('.image-container').draggable('disable');
      this.isDraggable = false;
    } else {
      $('.image-container').draggable('enable');
      this.isDraggable = true;
    }
  }

  zoomIn() {
    this.imgContRef.nativeElement.style.width = (this.imgContRef.nativeElement.clientWidth + ZOOM_VALUE) + "px";
    // this.imgRef.nativeElement.style.width = (this.imgRef.nativeElement.clientWidth + ZOOM_VALUE) + "px";
  }

  zoomOut() {
    this.imgContRef.nativeElement.style.width = (this.imgContRef.nativeElement.clientWidth - ZOOM_VALUE) + "px";
    // this.imgRef.nativeElement.style.width = (this.imgRef.nativeElement.clientWidth - ZOOM_VALUE) + "px";
  }

  deleteMarker(key) {
    this.image.deleteMarker(key);
  }

  listMarkerMouseEnter(key: string) {
    this.image.markers[Number(key)].highlighted = true;
  }

  listMarkerMouseLeave(key: string) {
    this.image.markers[Number(key)].highlighted = false;
  }

  noSort() {
    return 0;
  }
}
