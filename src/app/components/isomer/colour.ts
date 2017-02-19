export class Colour {
  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;
  public hue: number;
  public lightness: number;
  public saturation: number;

  constructor(r: string | number, g: string | number, b: string | number, a: string | number = 0) {
    this.red = this.getNumber(r);
    this.green = this.getNumber(g);
    this.blue = this.getNumber(b);
    this.alpha = (Math.round(this.getNumber(a, 1) * 100) / 100);
    this.loadHSL();
  }

  getNumber(value: string | number, defaultValue = 0): number {
    if (typeof value === 'string' ) {
      return parseInt(value || defaultValue.toString(), 10);
    }
    return value;
  }

  toHex() {
    // Pad with 0s
    let hex = (this.red * 256 * 256 + this.green * 256 + this.blue).toString(16);
    if (hex.length < 6) {
      hex = new Array(6 - hex.length + 1).join('0') + hex;
    }

    return '#' + hex;
  };


  /**
   * Returns a lightened color based on a given percentage and an optional
   * light color
   */
  lighten(percentage: number, lightColor: Colour): Colour {
    lightColor = lightColor || new Colour(255, 255, 255);

    const newColor = new Colour(
      (lightColor.red / 255) * this.red,
      (lightColor.green / 255) * this.green,
      (lightColor.blue / 255) * this.blue,
      this.alpha
    );

    newColor.lightness = Math.min(newColor.lightness + percentage, 1);

    newColor.loadRGB();
    return newColor;
  }

  /**
   * Loads HSL values using the current RGB values
   * Converted from:
   * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
   */
  loadHSL() {
    const r = this.red / 255;
    const g = this.green / 255;
    const b = this.blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h: number, s: number;
    const l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0;  // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    this.hue = h;
    this.saturation = s;
    this.lightness = l;
  }


  /**
   * Reloads RGB using HSL values
   * Converted from:
   * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
   */
  loadRGB() {
    let r: number, g: number, b: number;
    const h = this.hue;
    const s = this.saturation;
    const l = this.lightness;

    if (s === 0) {
      r = g = b = l;  // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = this._hue2rgb(p, q, h + 1 / 3);
      g = this._hue2rgb(p, q, h);
      b = this._hue2rgb(p, q, h - 1 / 3);
    }

    this.red = r * 255;
    this.green = g * 255;
    this.blue = b * 255;
  }


  /**
   * Helper function to convert hue to rgb
   * Taken from:
   * http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
   */
  _hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
}
