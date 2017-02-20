import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Canvas} from './canvas';
import {Shape} from './shape';
import {Path} from './path';
import {Point} from './point';
import {Vector} from './vector';
import {Colour} from './colour';
import {WindowingService} from "../../services/windowing-service";

@Component({
  selector: 'app-isomer',
  templateUrl: './isomer.component.html',
  styleUrls: ['./isomer.component.css']
})
export class IsomerComponent implements AfterViewInit {

  private canvas: Canvas;
  private angle: number;
  private scale: number;
  private transformation: number[][];
  private originX: number;
  private originY: number;
  private lightAngle: Vector;
  private lightPosition: Vector;
  private colorDifference: number;
  private lightColor: Colour;

  @ViewChild('myCanvasInstance') canvasInstance: ElementRef;

  constructor(private windowingService : WindowingService) {
  }

  ngAfterViewInit()
  {
    const canvasElement = <HTMLCanvasElement>this.canvasInstance.nativeElement;

    // Make it visually fill the positioned parent
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';

    this.canvas = new Canvas(canvasElement);
    this.canvas.drawGrid();
    return;

/*
    const options = {
      originX: undefined,
      originY: undefined,
      lightPosition: undefined,
      scale : undefined,
      lightColor: undefined
    };

    const canvasElement = <HTMLCanvasElement>this.canvasInstance.nativeElement;
    this.canvas = new Canvas(canvasElement);
    this.angle = Math.PI / 6;

    this.scale = options.scale || 70;

    this._calculateTransformation();

    this.originX = options.originX || canvasElement.width / 2;
    this.originY = options.originY || canvasElement.height * 0.9;

    this.lightPosition = options.lightPosition || new Vector(2, -1, 3);
    this.lightAngle = this.lightPosition.normalize();

    this.colorDifference = 0.20;
    this.lightColor = options.lightColor || new Colour(255, 255, 255);


    var red: Colour = new Colour(160, 60, 50);
    var blue: Colour = new Colour(50, 60, 160);

    this.addShape(Shape.Prism(Point.ORIGIN, 3, 3, 1), red);
    //const shapeObject: Shape = Shape.Pyramid(new Point(0, 2, 1));
    //this.addShape(shapeObject, red);
    //this.add(Shape.Prism(Point(2, 0, 1)), blue);
    */
  }

  /**
   * Sets the light position for drawing.
   */
  setLightPosition(x, y, z) {
    this.lightPosition = new Vector(x, y, z);
    this.lightAngle = this.lightPosition.normalize();
  };

  _translatePoint(point): Point {
    /**
     * X rides along the angle extended from the origin
     * Y rides perpendicular to this angle (in isometric view: PI - angle)
     * Z affects the y coordinate of the drawn point
     */
    const xMap = new Point(point.x * this.transformation[0][0], point.x * this.transformation[0][1]);
    const yMap = new Point(point.y * this.transformation[1][0], point.y * this.transformation[1][1]);
    const x = this.originX + xMap.x + yMap.x;
    const y = this.originY - xMap.y - yMap.y - (point.z * this.scale);
    return new Point(x, y);
  };


  /**
   * Adds a shape or path to the scene
   *
   * This method also accepts arrays
   */
  addShape(item: Shape, baseColour: Colour)
  {
    const paths = item.orderedPaths();
    for (let j = 0; j < paths.length; j++) {
      this._addPath(paths[j], baseColour);
    }
  }
  addPath(item: Path, baseColour: Colour)
  {
    this._addPath(item, baseColour);
  }

  /*
  add(item: Shape|Path|Colour, baseColor: Colour) {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      for (let i = 0; i < item.length; i++) {
        this.add(item[i], baseColor);
      }
    } else if (item instanceof Path) {
      this.addPath(item, baseColor);
    } else if (item instanceof Shape) {
      this.addShape(item, baseColor);
    }
  };
  */

  /**
   * Adds a path to the scene
   */
  _addPath(path: Path, baseColor: Colour) {
    /* Default baseColor */
    baseColor = baseColor || new Colour(120, 120, 120);

    /* Compute color */
    const v1 = Vector.fromTwoPoints(path.points[1], path.points[0]);
    const v2 = Vector.fromTwoPoints(path.points[2], path.points[1]);
    const normal = Vector.crossProduct(v1, v2).normalize();

    /**
     * Brightness is between -1 and 1 and is computed based
     * on the dot product between the light source vector and normal.
     */
    const brightness = Vector.dotProduct(normal, this.lightAngle);
    const color = baseColor.lighten(brightness * this.colorDifference, this.lightColor);

    var pointItems: Point[] = <Point[]>path.points.map(this._translatePoint.bind(this));
    this.canvas.path(pointItems, color);
  }

  /**
   * Precalculates transformation values based on the current angle and scale
   * which in theory reduces costly cos and sin calls
   */
  _calculateTransformation() {
    this.transformation = [
      [
        this.scale * Math.cos(this.angle),
        this.scale * Math.sin(this.angle)
      ],
      [
        this.scale * Math.cos(Math.PI - this.angle),
        this.scale * Math.sin(Math.PI - this.angle)
      ]
    ];
  }
}
