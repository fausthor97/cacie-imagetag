import { IPoint } from './point.model';
import { matrix, pow, lusolve } from 'mathjs';

export class CircleMarker3p {
    readonly type = '3-point-circle-marker'
    points: {
        a: IPoint;
        b: IPoint;
        c: IPoint;
    };
    center: IPoint;
    radius: number;
    diameter: number;
    position: IPoint;
    highlighted: boolean;

    constructor(clicks: IPoint[]) {
        if (clicks.length != 3) {
            throw Error('3 Points are needed to create markers.');
        }
        this.points = { a: clicks[0], b: clicks[1], c: clicks[2] }
        this.calculateProperties();
    }

    public translatePosition(currentWidth, currentHeight, newWidth, newHeight) {
        this.points.a.x = (this.points.a.x * newWidth) / currentWidth;
        this.points.a.y = (this.points.a.y * newHeight) / currentHeight;
        this.points.b.x = (this.points.b.x * newWidth) / currentWidth;
        this.points.b.y = (this.points.b.y * newHeight) / currentHeight;
        this.points.c.x = (this.points.c.x * newWidth) / currentWidth;
        this.points.c.y = (this.points.c.y * newHeight) / currentHeight;
        this.calculateProperties();
    }

    public updatePoints(pointA: IPoint, pointB: IPoint, pointC: IPoint) {
        this.points = { a: pointA, b: pointB, c: pointC };
        this.calculateProperties();
    }

    private calculateProperties() {
        this.center = this.calculateCenter(this.points.a, this.points.b, this.points.c);
        this.radius = this.calculateDistance(this.center, this.points.a);
        this.diameter = this.radius*2;
        this.position = this.calculatePosition(this.center, this.radius);
        console.log(this.center);
    }

    private calculateCenter(p1: IPoint, p2: IPoint, p3: IPoint): IPoint {
        const solution = lusolve(
            matrix([
                [2*p1.x,        2*p1.y,        1],
                [2*(p2.x-p1.x), 2*(p2.y-p1.y), 0],
                [2*(p3.x-p1.x), 2*(p3.y-p1.y), 0]
            ]),
            matrix([
                [pow(p1.x, 2) + pow(p1.y, 2)],
                [pow(p2.x, 2) + pow(p2.y, 2) - (pow(p1.x, 2) + pow(p1.y, 2))],
                [pow(p3.x, 2) + pow(p3.y, 2) - (pow(p1.x, 2) + pow(p1.y, 2))]
            ])
        );
        console.log(solution);
        console.log(solution._data);
        return { x: solution._data[0], y: solution._data[1] };
    }

    private calculateDistance(p1: IPoint, p2: IPoint) {
        const a = p1.x - p2.x;
        const b = p1.y - p2.y;
        return Math.sqrt( a*a + b*b );
    }

    private calculatePosition(center: IPoint, radius: number) {
        const xPos = center.x - radius;
        const yPos = center.y - radius;
        return { x: xPos, y: yPos } as IPoint;
    }
}
