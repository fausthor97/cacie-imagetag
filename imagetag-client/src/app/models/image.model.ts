import { CircleMarker } from './circle-marker.model';
import { IPoint } from './point.model';
import { CircleMarker3p } from './circle-marker-3p.model';

type MarkerType = 'circle'|'3-point-circle'|'polygon';

export class Image {
    url: string;
    fileWidth: number;
    fileHeight: number;
    displayWidth: number;
    displayHeight: number;
    currentMarkerType: MarkerType;
    clicks: IPoint[];
    markers: CircleMarker[];
    circleMarkers: CircleMarker3p[];

    constructor(
        imageUrl: string,
        defaultMarkerType: MarkerType = '3-point-circle'
    ) {
        this.url = imageUrl;
        this.currentMarkerType = defaultMarkerType;
        this.markers = [];
        this.circleMarkers = [];
        this.clicks = [];
    }

    onClick(click) {
        this.clicks.push({ x: click.layerX, y: click.layerY });

        if (this.clicks.length == 2 && this.currentMarkerType === 'circle') {
            this.markers.push(new CircleMarker(this.clicks));
            this.clicks = [];
        } else if (this.clicks.length == 3 && this.currentMarkerType === '3-point-circle') {
            this.circleMarkers.push(new CircleMarker3p(this.clicks));
            this.clicks = [];
        }
    }

    setInitialDimensions(fileWidth: number, fileHeight: number, displayWidth: number, displayHeight) {
        if (this.fileWidth || this.fileHeight || this.displayWidth || this.displayHeight) {
            throw Error('Dimensions have already been set.');
        }
        this.fileWidth = fileWidth;
        this.fileHeight = fileHeight;
        this.displayWidth = displayWidth;
        this.displayHeight = displayHeight;
    }

    updateDisplayDimesions(newWidth: number, newHeight: number) {
        this.circleMarkers.forEach(marker => {
            marker.translatePosition(
                this.displayWidth,
                this.displayHeight,
                newWidth,
                newHeight
            );
        });
        this.displayWidth = newWidth;
        this.displayHeight = newHeight;
    }

    deleteMarker(key) {
        if (!key) {
            throw Error('No key was provided for delete.');
        }
        if (isNaN(key)) {
            throw Error('Key provided for delete is NaN.')
        }
        if (this.currentMarkerType == '3-point-circle') {
            this.circleMarkers.splice(key, 1);
        }
    }

    setMarkerType(markerType: MarkerType) {
        this.currentMarkerType = markerType;
        this.clicks = [];
    }
}