import { CircleMarker } from './circle-marker.model';
import { IPoint } from './point.model';

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

    constructor(
        imageUrl: string,
        defaultMarkerType: MarkerType = 'circle'
    ) {
        this.url = imageUrl;
        this.currentMarkerType = defaultMarkerType;
        this.markers = [];
        this.clicks = [];
    }

    onClick(click) {
        this.clicks.push({ x: click.layerX, y: click.layerY });

        // circle marker
        if (this.clicks.length == 2 && this.currentMarkerType === 'circle') {
            this.createCircleMarker(this.clicks);
        }
    }

    private createCircleMarker(clicks: IPoint[]) {
        this.markers.push(new CircleMarker(clicks));
        this.clicks = [];
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
        this.markers.forEach(marker => {
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
        this.markers.splice(key, 1);
    }

    setMarkerType(markerType: MarkerType) {
        this.currentMarkerType = markerType;
        this.clicks = [];
    }
}