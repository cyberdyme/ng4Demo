import {Path} from './path';
import {Point} from './point';

export class Shape {
  private paths: Array<Path>;

  constructor(paths: Array<Path>) {
    if (Object.prototype.toString.call(paths) === '[object Array]') {
      this.paths = paths;
    } else {
      this.paths = Array.prototype.slice.call(arguments);
    }
  }


  /**
   * Pushes a path onto the end of the Shape
   */
  push(path) {
    this.paths.push(path);
  }


  /**
   * Translates a given shape
   *
   * Simply a forward to Path#translate
   */
  translate(...values: Point[]) {
    return new Shape(this.paths.map(function (path) {
      return path.translate.apply(path, values);
    }));
  }

  /**
   * Rotates a given shape along the X axis around a given origin
   *
   * Simply a forward to Path#rotateX
   */
  rotateX(...values: number[]) {
    return new Shape(this.paths.map(function (path) {
      return path.rotateX.apply(path, values);
    }));
  }

  /**
   * Rotates a given shape along the Y axis around a given origin
   *
   * Simply a forward to Path#rotateY
   */
  rotateY(...values: number[]) {
    return new Shape(this.paths.map(function (path) {
      return path.rotateY.apply(path, values);
    }));
  }

  /**
   * Rotates a given shape along the Z axis around a given origin
   *
   * Simply a forward to Path#rotateZ
   */
  rotateZ(...values: number[]) {
    return new Shape(this.paths.map(function (path) {
      return path.rotateZ.apply(path, values);
    }));
  }

  /**
   * Scales a path about a given origin
   *
   * Simply a forward to Point#scale
   */
  scale(...values: number[]) {
    return new Shape(this.paths.map(function (path) {
      return path.scale.apply(path, values);
    }));
  }


  /**
   * Produces a list of the shape's paths ordered by distance to
   * prevent overlaps when drawing
   */
  orderedPaths() {
    const paths = this.paths.slice();

    /**
     * Sort the list of faces by distance then map the entries, returning
     * only the path and not the added "further point" from earlier.
     */
    return paths.sort(function (pathA, pathB) {
      return pathB.depth() - pathA.depth();
    });
  }


  /**
   * Utility function to create a 3D object by raising a 2D path
   * along the z-axis
   */
  static extrude(path, height) {
    height = (typeof height === 'number') ? height : 1;

    let i: number;
    const topPath: Path = path.translate(0, 0, height);
    const shape: Shape = new Shape(new Array<Path>());

    /* Push the top and bottom faces, top face must be oriented correctly */
    shape.push(path.reverse());
    shape.push(topPath);

    /* Push each side face */
    for (i = 0; i < path.points.length; i++) {
      shape.push(new Path([
        topPath.points[i],
        path.points[i],
        path.points[(i + 1) % path.points.length],
        topPath.points[(i + 1) % topPath.points.length]
      ]));
    }

    return shape;
  };


  /**
   * Some shapes to play with
   */

  /**
   * A prism located at origin with dimensions dx, dy, dz
   */
  public static Prism(origin : Point, dx = 1, dy = 1, dz = 1) {
    dx = (typeof dx === 'number') ? dx : 1;
    dy = (typeof dy === 'number') ? dy : 1;
    dz = (typeof dz === 'number') ? dz : 1;

    /* The shape we will return */
    const prism = new Shape(new Array<Path>());

    /* Squares parallel to the x-axis */
    const face1 = new Path([
      origin,
      new Point(origin.x + dx, origin.y, origin.z),
      new Point(origin.x + dx, origin.y, origin.z + dz),
      new Point(origin.x, origin.y, origin.z + dz)
    ]);

    /* Push this face and its opposite */
    prism.push(face1);
    prism.push(face1.reverse().translate(0, dy, 0));

    /* Square parallel to the y-axis */
    const face2 = new Path([
      origin,
      new Point(origin.x, origin.y, origin.z + dz),
      new Point(origin.x, origin.y + dy, origin.z + dz),
      new Point(origin.x, origin.y + dy, origin.z)
    ]);
    prism.push(face2);
    prism.push(face2.reverse().translate(dx, 0, 0));

    /* Square parallel to the xy-plane */
    const face3 = new Path([
      origin,
      new Point(origin.x + dx, origin.y, origin.z),
      new Point(origin.x + dx, origin.y + dy, origin.z),
      new Point(origin.x, origin.y + dy, origin.z)
    ]);
    /* This surface is oriented backwards, so we need to reverse the points */
    prism.push(face3.reverse());
    prism.push(face3.translate(0, 0, dz));

    return prism;
  };


  public static Pyramid(origin: Point, dx = 0, dy = 0, dz = 0): Shape {
    const pyramid = new Shape(new Array<Path>());

    /* Path parallel to the x-axis */
    const face1 = new Path([
      origin,
      new Point(origin.x + dx, origin.y, origin.z),
      new Point(origin.x + dx / 2, origin.y + dy / 2, origin.z + dz)
    ]);
    /* Push the face, and its opposite face, by rotating around the Z-axis */
    pyramid.push(face1);
    pyramid.push(face1.rotateZ(origin.translate(dx / 2, dy / 2), Math.PI));

    /* Path parallel to the y-axis */
    const face2 = new Path([
      origin,
      new Point(origin.x + dx / 2, origin.y + dy / 2, origin.z + dz),
      new Point(origin.x, origin.y + dy, origin.z)
    ]);
    pyramid.push(face2);
    pyramid.push(face2.rotateZ(origin.translate(dx / 2, dy / 2), Math.PI));

    return pyramid;
  }


  public static Cylinder(origin: Point, radius: number, vertices: number, height: number) {
    const circle = Path.Circle(origin, radius, vertices);
    const cylinder = Shape.extrude(circle, height);
    return cylinder;
  }
}
