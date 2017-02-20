import {Point} from "./point";
import {Colour} from "./colour";
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(private elem: HTMLCanvasElement) {
    this.ctx = this.elem.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  path(points: Point[], color: Colour) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
      console.log('Iso::points =' + i + ' x=' + points[i].x + ' y=' + points[i].y);
    }

    this.ctx.closePath();

    // Set the strokeStyle and fillStyle
    this.ctx.save();
    this.ctx.globalAlpha = color.alpha;
    this.ctx.strokeStyle = "#FF0000";
    this.ctx.fillStyle = "#FFFF00";
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  };

  drawGrid() {
    var gridOptions = {
      minorLines: {
        separation: 5,
        color: '#00FF00'
      },
      majorLines: {
        separation: 30,
        color: '#FF0000'
      }
    };

    //this.width = this.elem.width;
    //this.height = this.elem.height;

    this.drawGridLines(gridOptions.minorLines);
    this.drawGridLines(gridOptions.majorLines);

  }

  private drawGridLines(lineOptions) {
    this.width=this.ctx.canvas.width;
    this.height=this.ctx.canvas.height;
    console.log('Iso::Canvas width=' + this.width);
    console.log('Iso::Canvas height=' + this.height);


    var iWidth = this.width;
    var iHeight = this.height;



    this.ctx.strokeStyle = lineOptions.color;
    //this.ctx.strok = 1;

    this.ctx.beginPath();

    var iCount = null;
    var i = null;
    var x = null;
    var y = null;

    iCount = Math.floor(iWidth / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
      x = (i * lineOptions.separation);
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, iHeight);
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }


    iCount = Math.floor(iHeight / lineOptions.separation);

    for (i = 1; i <= iCount; i++) {
      y = (i * lineOptions.separation);
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(iWidth, y);
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    this.ctx.closePath();

    return;
  }
}
