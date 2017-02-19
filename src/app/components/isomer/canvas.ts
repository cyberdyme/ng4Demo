import {Point} from "./point";
import {Colour} from "./colour";
export class Canvas {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(private elem: HTMLCanvasElement) {
    this.ctx = this.elem.getContext('2d');
    this.width = elem.width;
    this.height = elem.height;

    console.log('Iso::Canvas width='+this.width);
    console.log('Iso::Canvas height='+this.height);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  path(points: Point[], color: Colour) {
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
      console.log('Iso::points ='+i+' x='+points[i].x+' y='+points[i].y);
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
}
