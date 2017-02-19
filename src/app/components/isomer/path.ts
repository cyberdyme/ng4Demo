import {Point} from './point';

export class Path {
  public points: Array<Point>;

  /**
   * A circle centered at origin with a given radius and number of vertices
   */
  static Circle(origin: Point, radius: number, vertices: number) {
    vertices = vertices || 20;
    let i: number;
    const path = new Path([]);

    for (i = 0; i < vertices; i++) {
      path.push(new Point(
        radius * Math.cos(i * 2 * Math.PI / vertices),
        radius * Math.sin(i * 2 * Math.PI / vertices),
        0));
    }

    return path.translate(origin.x, origin.y, origin.z);
  };

  /**
   * Path utility class
   *
   * An Isomer.Path consists of a list of Isomer.Point's
   */
  constructor(points: Point[]) {
    if (Object.prototype.toString.call(points) === '[object Array]') {
      this.points = points;
    } else {
      this.points = Array.prototype.slice.call(arguments);
    }
  }

  /**
   * Pushes a point onto the end of the path
   */
  push(point: Point) {
    this.points.push(point);
  };


  /**
   * Returns a new path with the points in reverse order
   */
  reverse(): Path {
    const points = Array.prototype.slice.call(this.points);
    return new Path(points.reverse());
  };


  /**
   * Translates a given path
   *
   * Simply a forward to Point#translate
   */
  translate(...values: number[]): Path {
    return new Path(this.points.map(function (point) {
      return point.translate.apply(point, values);
    }));
  };

  /**
   * Returns a new path rotated along the X axis by a given origin
   *
   * Simply a forward to Point#rotateX
   */
  rotateX(origin: Point, angle: number): Path {
    return new Path(this.points.map(function (point) {
      return point.rotateX.apply(origin, angle);
    }));
  };

  /**
   * Returns a new path rotated along the Y axis by a given origin
   *
   * Simply a forward to Point#rotateY
   */
  rotateY(origin: Point, angle: number): Path {
    return new Path(this.points.map(function (point) {
      return point.rotateY.apply(origin, angle);
    }));
  };

  /**
   * Returns a new path rotated along the Z axis by a given origin
   *
   * Simply a forward to Point#rotateZ
   */
  rotateZ(origin: Point, angle: number): Path {
    return new Path(this.points.map(function (point) {
      return point.rotateZ(origin, angle);
    }));
  };


  /**
   * Scales a path about a given origin
   *
   * Simply a forward to Point#scale
   */
  scale(...values: Point[]): Path {
    return new Path(this.points.map(function (point) {
      return point.scale.apply(point, values);
    }));
  };


  /**
   * The estimated depth of a path as defined by the average depth
   * of its points
   */
  depth(): number {
    let i: number, total = 0;
    for (i = 0; i < this.points.length; i++) {
      total += this.points[i].depth();
    }

    return total / (this.points.length || 1);
  };


  /**
   * Some paths to play with
   */

  /**
   * A rectangle with the bottom-left corner in the origin
   */
  Rectangle(origin, width, height): Path {
    if (width === undefined) {
      width = 1;
    }

    if (height === undefined) {
      height = 1;
    }

    const path = new Path([
      origin,
      new Point(origin.x + width, origin.y, origin.z),
      new Point(origin.x + width, origin.y + height, origin.z),
      new Point(origin.x, origin.y + height, origin.z)
    ]);

    return path;
  };

  /**
   * A star centered at origin with a given outer radius, inner
   * radius, and number of points
   *
   * Buggy - concave polygons are difficult to draw with our method
   */
  Star(origin: Point, outerRadius: number, innerRadius: number, points: number): Path {
    let i: number, r: number;
    const path = new Path(new Array<Point>());

    for (i = 0; i < points * 2; i++) {
      r = (i % 2 === 0) ? outerRadius : innerRadius;

      path.push(new Point(
        r * Math.cos(i * Math.PI / points),
        r * Math.sin(i * Math.PI / points),
        0));
    }

    return path.translate(origin.x, origin.y, origin.z);
  }
}
