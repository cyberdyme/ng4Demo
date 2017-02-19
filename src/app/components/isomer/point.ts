export class Point {
  public static ORIGIN = new Point(0, 0, 0);
  public x: number;
  public y: number;
  public z: number;

  constructor(x = 0, y = 0, z = 0) {
    if (this instanceof Point) {
      this.x = (typeof x === 'number') ? x : 0;
      this.y = (typeof y === 'number') ? y : 0;
      this.z = (typeof z === 'number') ? z : 0;
    } else {
      return new Point(x, y, z);
    }
  }

  /**
   * Translate a point from a given dx, dy, and dz
   */
  translate(dx: number, dy: number, dz?: number): Point {
    dx = (typeof dx === 'number') ? dx : 0;
    dy = (typeof dy === 'number') ? dy : 0;
    dz = (typeof dz === 'number') ? dz : 0;

    return new Point(
      this.x + dx,
      this.y + dy,
      this.z + dz);
  };


  /**
   * Scale a point about a given origin
   */
  scale(origin: Point, dx: number, dy: number, dz: number) {
    const p = this.translate(-origin.x, -origin.y, -origin.z);

    if (dy === undefined && dz === undefined) {
      /* If both dy and dz are left out, scale all coordinates equally */
      dy = dz = dx;
      /* If just dz is missing, set it equal to 1 */
    } else {
      dz = (typeof dz === 'number') ? dz : 1;
    }

    p.x *= dx;
    p.y *= dy;
    p.z *= dz;

    return p.translate(origin.x, origin.y, origin.z);
  };

  /**
   * Rotate about origin on the X axis
   */
  rotateX(origin: Point, angle: number): Point {
    const p = this.translate(-origin.x, -origin.y, -origin.z);
    const z = p.z * Math.cos(angle) - p.y * Math.sin(angle);
    const y = p.z * Math.sin(angle) + p.y * Math.cos(angle);
    p.z = z;
    p.y = y;

    return p.translate(origin.x, origin.y, origin.z);
  };

  /**
   * Rotate about origin on the Y axis
   */
  rotateY(origin: Point, angle: number): Point {
    const p = this.translate(-origin.x, -origin.y, -origin.z);
    const x = p.x * Math.cos(angle) - p.z * Math.sin(angle);
    const z = p.x * Math.sin(angle) + p.z * Math.cos(angle);
    p.x = x;
    p.z = z;

    return p.translate(origin.x, origin.y, origin.z);
  };

  /**
   * Rotate about origin on the Z axis
   */
  rotateZ(origin: Point, angle: number): Point {
    const p = this.translate(-origin.x, -origin.y, -origin.z);
    const x = p.x * Math.cos(angle) - p.y * Math.sin(angle);
    const y = p.x * Math.sin(angle) + p.y * Math.cos(angle);
    p.x = x;
    p.y = y;

    return p.translate(origin.x, origin.y, origin.z);
  };


  /**
   * The depth of a point in the isometric plane
   */
  depth(): number {
    /* z is weighted slightly to accomodate |_ arrangements */
    return this.x + this.y - 2 * this.z;
  };


  /**
   * Distance between two points
   */
  public static distance(p1: Point, p2: Point): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dz = p2.z - p1.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };
}
