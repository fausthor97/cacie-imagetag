import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss'],
})

export class ImageCanvasComponent implements OnInit {
  @Input() imageUrl;
  @ViewChild('imageTag', { static: false }) imgRef: ElementRef<HTMLImageElement>;
  public image: Image;
  public imageHasLoaded: boolean;

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
    this.imageHasLoaded = true;
  }

  onImageClicked(click) {
    this.image.onClick(click);
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
