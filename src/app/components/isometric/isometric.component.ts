import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WindowingService, ResizeValues} from "../../services/windowing-service";
import {forEach} from "@angular/router/src/utils/collection";

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


@Component({
  selector: 'cs-isometric',
  template: `
    <div cs-resize-tracking style="height:calc(100vh - 68px); width=100vw; position:relative">
      <canvas #canvas>
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

  constructor(private  windowingService: WindowingService) {
    this.width = 1200;
    this.height = 1200;

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
