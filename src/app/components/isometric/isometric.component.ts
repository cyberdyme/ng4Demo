import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {WindowingService, ResizeValues} from "../../services/windowing-service";

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
    this.drawGrid()
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
    var iWidth = this.width;
    var iHeight = this.height;
    this.ctx.strokeStyle = lineOptions.color;

    this.ctx.beginPath();
    this.ctx.lineWidth = 1;

    let x = 0;
    while (x < iWidth) {
      x+=lineOptions.separation;
      this.drawLine(this.ctx, x,0,x,iHeight);
    }

    let y = 0;
    while (y < iHeight) {
      y+=lineOptions.separation;
      this.drawLine(this.ctx, 0,y,iWidth,y);
    }

    this.ctx.closePath();
    return;
  }

  private drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number)
  {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
}
