export enum ColorFormat {
  rgb = 'rgb',
  hex = 'hex',
}

export class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: Nullable<number>;

  constructor(color: string) {
    const format = this.detectColorFormat(color);
    if (format === ColorFormat.hex) {
      this.parseHex(color);
    } else {
      this.parseRGB(color);
    }
  }

  public toString(format: ColorFormat = ColorFormat.rgb) {
    if (format === ColorFormat.hex) {
      return this.toHexString();
    } else {
      return this.toRGBString();
    }
  }

  private toHexString(): string {
    const rHex = this.r.toString(16).padStart(2, '0');
    const gHex = this.g.toString(16).padStart(2, '0');
    const bHex = this.b.toString(16).padStart(2, '0');
    let aHex = '';
    if (this.a != null) {
      const alpha = Math.round(this.a * 255);
      aHex = alpha.toString(16).padStart(2, '0');
    }
    return `#${rHex}${gHex}${bHex}${aHex}`;
  }

  private toRGBString(): string {
    return this.a != null ? `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})` : `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  private detectColorFormat(color: string): ColorFormat {
    if (color.startsWith('#') && color.length >= 4) {
      return ColorFormat.hex;
    } else if (color.startsWith('rgb(') || color.startsWith('rgba(')) {
      return ColorFormat.rgb;
    } else {
      throw new Error(`Invalid color format: ${color}`);
    }
  }

  private parseHex(color: string): void {
    // Removing the # of the color string
    color = color.replace('#', '');
    if (color.length <= 4) {
      // Handle shorthand hex format
      color = color.replace(/./g, '$&$&');
    }

    const colorHex = parseInt(color, 16);
    if (color.length === 8) {
      this.r = (colorHex >> 24) & 255;
      this.g = (colorHex >> 16) & 255;
      this.b = (colorHex >> 8) & 255;
      this.a = (colorHex & 255) / 255;
    } else {
      this.r = (colorHex >> 16) & 255;
      this.g = (colorHex >> 8) & 255;
      this.b = colorHex & 255;
    }
  }

  private parseRGB(color: string): void {
    const [_, r, g, b, a] = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);
    this.r = parseInt(r, 10);
    this.g = parseInt(g, 10);
    this.b = parseInt(b, 10);
    if (a != null) {
      this.a = parseFloat(a);
    }
  }
}
