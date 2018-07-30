import { Injectable } from '@angular/core';
import { ColorMatrixElement } from '../models/color-matrix.model';
import { ColorPalette } from '../models/color-palette.model';
import { colorConvertor } from '../shared/utils';
@Injectable({
  providedIn: 'root'
})
export class ColorMatrixService {
  constructor() {}

  public computeColorMatrixData(
    backgroundColor: string,
    foregroundColor: string,
    size: number
  ): ColorMatrixElement {
    const LtextColor = this.convertToArray(
      colorConvertor.toRgb(backgroundColor, false)
    );
    const LbackgroundColor = this.convertToArray(
      colorConvertor.toRgb(foregroundColor, false)
    );
    const style = {
      'background-color': backgroundColor,
      color: foregroundColor
    };
    const ratio = this.calculateRatio(
      this.contrast(LtextColor, LbackgroundColor)
    );
    const level = this.getWCAGLevel(size, ratio);
    return {
      backgroundColor: backgroundColor,
      foregroundColor: foregroundColor,
      style: style,
      title: this.setRatioTitle(ratio),
      compliance: level,
      ratio: ratio
    };
  }

  public getLuminance(r: number, g: number, b: number) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }
  public contrast(rgb1, rgb2) {
    return (
      (this.getLuminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05) /
      (this.getLuminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05)
    );
  }

  public convertToArray(color) {
    color = color.slice(1, -1);
    return color.split(', ').map(Number);
  }
  public calculateRatio(contrast) {
    let ratio = 1 / contrast;
    if (ratio < 1) {
      ratio = 1 / ratio;
    }
    return ratio.toFixed(2);
  }
  public setRatioTitle(ratio) {
    return ratio + ':1';
  }
  public getWCAGLevel(size, ratio) {
    let level = 'X';
    if (size >= 11) {
      if (ratio >= 4.5) {
        if (ratio >= 7) {
          level = 'AAA';
        } else {
          level = 'AA';
        }
      }
    }
    if (size >= 18) {
      if (ratio >= 3) {
        if (ratio >= 4.5) {
          level = 'AAA';
        } else {
          level = 'AA';
        }
      }
    }
    if (size >= 24) {
      if (ratio >= 3) {
        if (ratio >= 4.5) {
          level = 'AAA';
        } else {
          level = 'AA';
        }
      }
    }
    return level;
  }
}
