import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WindowingService, ResizeValues} from "../../services/windowing-service";
import {Observable, ReplaySubject} from "rxjs";
import {Subject} from "rxjs";

enum ActionType
{
  DrawLine
}

export interface IDrawOperation
{
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

interface IPoint
{
  x: number,
  y: number,
  z?: number
}

interface IShape
{
  getPoints(): Observable<IPoint[]>;
}

export class Rectangle implements IShape
{
  private pointsSubject: ReplaySubject<IPoint[]> = new ReplaySubject<IPoint[]>(1);

  private halfWidth: number;
  private halfHeight: number;
  private left: number;
  private right: number;
  private top: number;
  private bottom: number;

  constructor(private x: number, private y: number, private width: number, private height: number){
    this.regenerate();
  }

  updatePosition(x: number, y: number)
  {
    if(this.x !==x || this.y !==y)
    {
      this.regenerate();
    }
  }

  updateDimensions(width: number, height: number)
  {
    if(this.width !==width || this.height !==height)
    {
      this.regenerate();
    }
  }

  regenerate()
  {
    this.halfWidth = this.width >> 1;
    this.halfHeight = this.height >> 1;
    this.left = this.x - this.halfWidth;
    this.right=this.halfWidth + this.x;
    this.top=this.y - this.halfHeight;
    this.bottom=this.halfHeight + this.y;

    this.pointsSubject.next([
      {x:this.left, y:this.top},
      {x:this.right, y:this.top},
      {x:this.right, y:this.bottom},
      {x:this.left, y: this.bottom}])
  }

  getPoints(): Observable<IPoint[]> {
    return this.pointsSubject.asObservable();
  }
}


export class Shape
{
  private shapeList: Array<IShape> = new Array<IShape>();

  private pointList: ReplaySubject<Observable<IPoint[]>> = new ReplaySubject<Observable<IPoint[]>>(1);

  constructor(private x: number, private y: number){
  }

  addShape(shape: IShape)
  {
    this.shapeList.push(shape);
    this.regenerate();
  }

  regenerate()
  {
    /*
    Observable.of(...this.shapeList).map(x => x.getPoints())
        .scan((acc: Array<IPoint>, value: IPoint) => {
          acc.push(value);
        }, []);
    };
    */

    /*
    var objs: Observable<IPoint[]> = Observable.of(...this.shapeList).map(x => x.getPoints()).flatMap(x => x);
    var pointsObj: Observable<IPoint[]> = objs.scan((acc: IPoint[], value: IPoint[]) => {
        acc.push(...value);
        return acc;
    }, []);

    this.pointList.next(pointsObj);
    */

    /*
    var allItems: Observable<IPoint[]> = Observable.of(...this.shapeList).map(x => x.getPoints()).flatMap(x => x);
    var singleObservable: Observable<IPoint[]> = Observable.from(allItems).merge();
    var wholeObservable = singleObservable.toArray();
    this.pointList.next(wholeObservable);
    */

    /*
    var singleObservable = Observable.from(allItems).toArray();
    var wholeObservable = singleObservable.toArray();
    this.pointList.next(wholeObservable);
    */

    /*
    var items = Observable.of(this.shapeList.map(x => x.getPoints()));
    var singleObservable=Observable.from(items).toArray();
    var wholeObservable = singleObservable.toArray();
    */

    this.pointList.next(Observable.of(...this.shapeList).map(x => x.getPoints()).flatMap(x => x));
  }

  /*
  getPoints(): Observable<IPoint[][]> {
    return this.pointList.asObservable().flatMap(x => x);
  }
  */
  getPoints(): Observable<IPoint[]> {
    return this.pointList.asObservable().flatMap(x => x);
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

  private drawList : Array<IDrawOperation>;
  private shapes: Shape = new Shape(0,0);

  constructor(private  windowingService: WindowingService) {
    this.width = 1200;
    this.height = 1200;


    this.shapes.getPoints().subscribe( p =>{
      console.log('items COUNT='+p.length);
    });
    this.shapes.addShape(new Rectangle(-64,-64,16,16));
    this.shapes.addShape(new Rectangle(64,-64,16,16));
    this.shapes.addShape(new Rectangle(64,64,16,16));
    this.shapes.addShape(new Rectangle(-64,64,16,16));
    this.shapes.regenerate();

    this.windowingService.getResizeObservable().subscribe((r: ResizeValues) => {
      this.width = r.width;
      this.height = r.height;
      if (this.isInitialised) {
        this.drawGrid();
      }
    });
  }

  @ViewChild('canvas') canvas: ElementRef;

  ngAfterViewInit(): void {
    const canvasControl = this.canvas.nativeElement as HTMLCanvasElement;
    this.ctx = canvasControl.getContext('2d');
    this.drawGrid();
    this.isInitialised = true;
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


    this.drawList=new Array<IDrawOperation>();

    /*
    let x = 0;
    while (x < iWidth) {
      x+=lineOptions.separation;
      this.drawList.push({x1:x,y1:0,x2:x,y2:iHeight});
    }

    let y = 0;
    while (y < iHeight) {
      y+=lineOptions.separation;
      this.drawList.push({x1:0,y1:y,x2:iWidth,y2:y});
    }
    */

    //this.drawList.push({x1:0,y1:8,x2:halfWidth,y2:iHeight - 8});
    //this.drawList.push({x1:8,y1:halfHeight,x2:iWidth - 8,y2:halfHeight});

    this.drawList.push({x1:-halfWidth+8,y1:0,x2:halfWidth-8,y2:0});
    this.drawList.push({x1:0,y1:-halfHeight+8,x2:0,y2:halfHeight-8});

    this.ctx.fillStyle="black";
    this.ctx.fillRect(0,0,iWidth, iHeight);

    this.ctx.strokeStyle = lineOptions.color;
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.drawList.forEach(p => {
      this.ctx.moveTo(p.x1 + halfWidth, p.y1 + halfHeight);
      this.ctx.lineTo(p.x2 + halfWidth, p.y2 + halfHeight);
      this.ctx.stroke();
    });
    this.ctx.closePath();
    return;
  }
}
