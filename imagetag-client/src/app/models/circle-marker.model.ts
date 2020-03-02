import { IPoint } from './point.model';

export class CircleMarker {
    readonly type = 'circle'
    points: {
        a: IPoint;
        b: IPoint;
    };
    radius: number;
    diameter: number;
    position: IPoint;
    highlighted: boolean;

    constructor(clicks: IPoint[]) {
        if (clicks.length != 2) {
            throw Error('2 Points are needed to create "circle" markers.');
        }
        this.points = { a: clicks[0], b: clicks[1] }
        this.calculateProperties();
    }

    public updatePoints(pointA: IPoint, pointB: IPoint) {
        this.points = { a: pointA, b: pointB };
        this.calculateProperties();
    }

    private calculateProperties() {
        this.radius = this.calculateRadius(this.points);
        this.diameter = this.radius*2;
        this.position= this.calculatePosition(this.points.a, this.radius)
    }

    private calculateRadius(points: { a: IPoint, b: IPoint }) {
        const I = points.a.x - points.b.x;
        const J = points.a.y - points.b.y;
        return Math.sqrt( I*I + J*J );
    }

    private calculatePosition(center: IPoint, radius: number) {
        const xPos = center.x - radius;
        const yPos = center.y - radius;
        return { x: xPos, y: yPos } as IPoint;
    }
}
