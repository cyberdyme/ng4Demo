import {Point} from './point';

export class Vector {
  /**
   * Alternate constructor
   */
  static fromTwoPoints(p1: Point, p2: Point) {
    return new Vector(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
  };

  static crossProduct(v1: Vector, v2: Vector): Vector {
    const i = v1.j * v2.k - v2.j * v1.k;
    const j = -1 * (v1.i * v2.k - v2.i * v1.k);
    const k = v1.i * v2.j - v2.i * v1.j;

    return new Vector(i, j, k);
  };

  static dotProduct(v1: Vector, v2: Vector): number {
    return v1.i * v2.i + v1.j * v2.j + v1.k * v2.k;
  };

  constructor(public i = 0, public j = 0, public k = 0) {
  }

  public magnitude(): number {
    return Math.sqrt(this.i * this.i + this.j * this.j + this.k * this.k);
  };

  public normalize(): Vector {
    const magnitude = this.magnitude();
    /**
     * If the magnitude is 0 then return the zero vector instead of dividing by 0
     */
    if (magnitude === 0) {
      return new Vector(0, 0, 0);
    }
    return new Vector(this.i / magnitude, this.j / magnitude, this.k / magnitude);
  };
}
