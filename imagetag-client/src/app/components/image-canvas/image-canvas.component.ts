import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { Observable } from 'rxjs';

const ZOOM_VALUE = 250;

@Component({
  selector: 'app-image-canvas',
  templateUrl: './image-canvas.component.html',
  styleUrls: ['./image-canvas.component.scss'],
})

export class ImageCanvasComponent implements OnInit {
  @Input() imageUrl;
  @Input() buttonEvents: Observable<'zoomIn'|'zoomOut'>;
  @ViewChild('imageTag', { static: false }) imgRef: ElementRef<HTMLImageElement>;
  @ViewChild('imageContainer', { static: false }) imgContRef: ElementRef<HTMLImageElement>;
  public image: Image;
  public imageHasLoaded: boolean;
  public isDraggable: boolean;

  constructor() { }

  ngOnInit() {
    this.image = new Image(this.imageUrl);
    this.buttonEvents.subscribe(event => {
      if (event === 'zoomIn') {
        this.zoomIn();
      } else if (event === 'zoomOut') {
        this.zoomOut();
      }
    });
    document.querySelector('body').onkeydown = (evt: KeyboardEvent) => {
      evt = evt || window.event as KeyboardEvent;
      if ((<KeyboardEvent>event).keyCode == 17) {
        this.enableImageDraggable();
      }
    };
    document.querySelector('body').onkeyup = () => {
      this.disableImageDraggable();
    };
  }

  onImageLoaded() {
    this.image.setInitialDimensions(
      this.imgRef.nativeElement.naturalWidth,
      this.imgRef.nativeElement.naturalHeight,
      this.imgRef.nativeElement.clientWidth,
      this.imgRef.nativeElement.clientHeight,
    );
    $('.image-container').draggable();
    $('.image-container').draggable('disable');
    this.imageHasLoaded = true;
  }

  enableImageDraggable() {
    this.isDraggable = true;
    $('.image-container').draggable('enable');
  }

  disableImageDraggable() {
    if (this.isDraggable) {
      this.isDraggable = false;
      $('.image-container').draggable('disable');
    }
  }

  onImageClicked(e: PointerEvent) {
    if (e.ctrlKey) {
      this.isDraggable = true;
      $('.image-container').draggable('enable');
    } else if (!this.isDraggable) {
      this.image.onClick(e);
    }
  }

  highlightMarker(key: string) {
    this.image.circleMarkers[Number(key)].highlighted = true;
  }

  removeMarkerHighlight(key: string) {
    this.image.circleMarkers[Number(key)].highlighted = false;
  }

  zoomIn() {
    this.imgContRef.nativeElement.style.width = (this.imgContRef.nativeElement.clientWidth + ZOOM_VALUE) + "px";
    this.image.updateDisplayDimesions(this.imgRef.nativeElement.clientWidth, this.imgRef.nativeElement.clientHeight);
  }

  zoomOut() {
    this.imgContRef.nativeElement.style.width = (this.imgContRef.nativeElement.clientWidth - ZOOM_VALUE) + "px";
    this.image.updateDisplayDimesions(this.imgRef.nativeElement.clientWidth, this.imgRef.nativeElement.clientHeight);
  }
}
