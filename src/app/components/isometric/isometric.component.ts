/*jshint bitwise: false*/

import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WindowingService, ResizeValues} from '../../services/windowing-service';
import {Observable, ReplaySubject} from 'rxjs';

enum ActionType {
  DrawLine
}

export interface IDrawOperation {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface IPoint {
  x: number;
  y: number;
  z?: number;
}

interface IShape {
  display();
  getPoints(): Observable<IPoint[]>;
  ObjectId: number;
}

export class Rectangle implements IShape {
  private static uniqueNumber: number = 0;
  private objectId: number;

  private halfWidth: number;
  private halfHeight: number;
  private left: number;
  private right: number;
  private top: number;
  private bottom: number;

  constructor(private x: number, private y: number, private width: number, private height: number) {
    this.objectId = Rectangle.uniqueNumber++;
    this.generate();
  }

  public get ObjectId(): number {
    return this.objectId;
  }

  updatePosition(x: number, y: number) {
    if (this.x !== x || this.y !== y) {
      this.generate();
    }
  }

  updateDimensions(width: number, height: number) {
    if (this.width !== width || this.height !== height) {
      this.generate();
    }
  }

  generate() {
    this.halfWidth = this.width >> 1;
    this.halfHeight = this.height >> 1;
    this.left = this.x - this.halfWidth;
    this.right = this.halfWidth + this.x;
    this.top = this.y - this.halfHeight;
    this.bottom = this.halfHeight + this.y;
  }

  display() {
    this.getPoints().subscribe(points => {
      console.log(`(${points[0].x},${points[0].y})----------(${points[1].x},${points[1].y})`);
      console.log(`|                     |`)
      console.log(`(${points[3].x},${points[3].y})----------(${points[2].x},${points[2].y})`);
    });
  }

  toJSON() {
    const {left, top, right, bottom} = this;
    return {left, top, right, bottom};
  }

  getPoints(): Observable<IPoint[]> {
    return Observable.of([
      {x: this.left, y: this.top},
      {x: this.right, y: this.top},
      {x: this.right, y: this.bottom},
      {x: this.left, y: this.bottom}]
    );
  }
}

export class Shape {
  private static uniqueNumber: number = 0;
  private objectId: number;
  private shapeList: Array<IShape> = new Array<IShape>();
  private pointsSubject: ReplaySubject<Observable<IPoint[]>> = new ReplaySubject<Observable<IPoint[]>>(1);

  constructor(private x: number, private y: number) {
    this.objectId = Shape.uniqueNumber++;
  }

  public get ObjectId() {
    return this.objectId;
  }

  addShape(shape: IShape) {
    console.log("Adding shape");
    this.shapeList.push(shape);
  }

  generate() {
    this.shapeList.forEach(x => this.pointsSubject.next(x.getPoints()));
  }

  getPoints(): Observable<IPoint[]> {
    return this.pointsSubject.flatMap(x => x);
  }
}


@Component({
  selector: 'cs-isometric',
  template: `
    <div style="height:calc(100vh - 68px); width=100vw; position:relative">
      <canvas cs-resize-tracking #canvas style="height:100%; width: 100%;">
      </canvas>
    </div>  `,
  styles: []
})
export class IsometricComponent implements AfterViewInit {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private isInitialised: boolean;

  private drawList: Array<IDrawOperation>;
  private shapes: Shape = new Shape(0, 0);
  @ViewChild('canvas') canvas: ElementRef;

  constructor(private  windowingService: WindowingService) {
    this.width = 1200;
    this.height = 1200;


    this.shapes.getPoints().subscribe((p: IPoint[]) => {
      this.ctx.fillStyle = "#FF000F";
      this.ctx.beginPath();
      this.ctx.lineWidth = 1;
      this.ctx.moveTo(p[0].x, p[0].y);
      this.ctx.lineTo(p[1].x, p[1].y);
      this.ctx.lineTo(p[2].x, p[2].y);
      this.ctx.lineTo(p[3].x, p[3].y);
      this.ctx.lineTo(p[0].x, p[0].y);
      this.ctx.stroke();
      this.ctx.closePath();
    });

    this.windowingService.getResizeObservable().subscribe((r: ResizeValues) => {
      this.width = r.width;
      this.height = r.height;
      if (this.isInitialised) {
        this.drawGrid();
      }
    });
  }

  ngAfterViewInit(): void {
    const canvasControl = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = canvasControl.getContext('2d');
    this.drawGrid();
    this.isInitialised = true;

    this.shapes.addShape(new Rectangle(-64, -64, 16, 16));
    this.shapes.addShape(new Rectangle(64, -64, 16, 16));
    this.shapes.addShape(new Rectangle(64, 64, 16, 16));
    this.shapes.addShape(new Rectangle(-64, 64, 16, 16));

    this.shapes.addShape(new Rectangle(128, 128, 16, 16));
    this.shapes.addShape(new Rectangle(100, 128, 16, 16));


    Observable.range(1, 10000).subscribe(
      p => {
        const x: number = Math.round(Math.random() * 900) - 450;
        const y: number = Math.round(Math.random() * 900) - 450;
        this.shapes.addShape(new Rectangle(x, y, 16, 16));
      }
    );

    this.shapes.addShape(new Rectangle(140, 128, 16, 16));
    this.shapes.generate();
  }

  drawGrid() {
    var gridOptions = {
      minorLines: {
        separation: 8,
        color: '#00FFF0'
      },
      majorLines: {
        separation: 32,
        color: '#FF0000'
      }
    };

    const canvasControl = this.canvas.nativeElement as HTMLCanvasElement;
    canvasControl.width = this.width;
    canvasControl.height = this.height;
    this.drawGridLines(gridOptions.majorLines);
  }

  private drawGridLines(lineOptions) {
    const iWidth = this.width;
    const iHeight = this.height;

    const halfWidth = iWidth >> 1;
    const halfHeight = iHeight >> 1;

    console.log(`iWidth = ${iWidth}`);
    console.log(`halfWidth = ${halfWidth}`);
    console.log(`iHeight = ${iHeight}`);
    console.log(`halfHeight = ${halfHeight}`);


    this.drawList = new Array<IDrawOperation>();


    this.ctx.translate(halfWidth, halfHeight);
    this.ctx.scale(1, 0.5);
    this.ctx.rotate(Math.PI / 4);

    this.drawList.push({x1: -halfWidth + 8, y1: 0, x2: halfWidth - 8, y2: 0});
    this.drawList.push({x1: 0, y1: -halfHeight + 8, x2: 0, y2: halfHeight - 8});


    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, iWidth, iHeight);
    this.ctx.strokeStyle = lineOptions.color;
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.drawList.forEach(p => {
      this.ctx.moveTo(p.x1, p.y1);
      this.ctx.lineTo(p.x2, p.y2);
      this.ctx.stroke();
    });
    this.ctx.closePath();
    return;
  }
}
