import { Injectable } from '@angular/core';
import { ColorMatrixCell } from '../models/color-matrix.model';
import { ColorPalette } from '../models/color-palette.model';
import { colorConvertor } from '../shared/utils';
import { FontWeight } from '../enums/font-weight.enum';
@Injectable({
  providedIn: 'root'
})
export class ColorMatrixService {
  constructor() {}

  public computeColorMatrixData(
    backgroundColor: string,
    foregroundColor: string,
    size: number,
    fontWeight: FontWeight
  ): ColorMatrixCell {
    const LtextColor = this.convertToArray(
      colorConvertor.toRgb(backgroundColor, false)
    );
    const LbackgroundColor = this.convertToArray(
      colorConvertor.toRgb(foregroundColor, false)
    );
    const style = {
      'font-size': size + 'px',
      'font-weight': fontWeight,
      'background-color': backgroundColor,
      color: foregroundColor
    } as Object;
    const ratio = this.calculateRatio(
      this.contrast(LtextColor, LbackgroundColor)
    );
    const level = this.getWCAGLevel(size, ratio, fontWeight);
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

  public convertToArray(color): number[] {
    color = color.slice(1, -1);
    return color.split(', ').map(Number);
  }
  public calculateRatio(contrast): number {
    let ratio = 1 / contrast;
    if (ratio < 1) {
      ratio = 1 / ratio;
    }
    return Number(ratio.toFixed(2));
  }
  public setRatioTitle(ratio: number): string {
    return ratio + ':1';
  }
  public getWCAGLevel(size: number, ratio: number, fontWeight: FontWeight) {
    let level = 'X';
    if (size >= 11 && size < 18.66) {
      if (ratio >= 4.5 && ratio < 7) {
        level = 'AA';
      } else if (ratio > 7) {
        level = 'AAA';
      }
    }
    if (size >= 18.66 && size < 24) {
      if (
        ratio >= 3 &&
        (fontWeight === FontWeight.BOLD ||
          fontWeight === FontWeight.BOLDER ||
          fontWeight === FontWeight.ONE_HUNDRED ||
          fontWeight === FontWeight.SEVEN_HUNDRED ||
          fontWeight === FontWeight.EIGHT_HUNDRED)
      ) {
        level = 'AA';
      } else if (
        ratio >= 4.5 &&
        ratio < 7 &&
        (fontWeight === FontWeight.LIGHTER ||
          fontWeight === FontWeight.NORMAL ||
          fontWeight === FontWeight.ONE_HUNDRED ||
          fontWeight === FontWeight.TWO_HUNDRED ||
          fontWeight === FontWeight.THREE_HUNDRED ||
          fontWeight === FontWeight.FOUR_HUNDRED ||
          fontWeight === FontWeight.FIVE_HUNDRED ||
          fontWeight === FontWeight.SIX_HUNDRED)
      ) {
        level = 'AA';
      } else if (
        ratio >= 4.5 &&
        ratio < 7 &&
        (fontWeight === FontWeight.BOLD ||
          fontWeight === FontWeight.BOLDER ||
          fontWeight === FontWeight.ONE_HUNDRED ||
          fontWeight === FontWeight.SEVEN_HUNDRED ||
          fontWeight === FontWeight.EIGHT_HUNDRED)
      ) {
        level = 'AAA';
      } else if (ratio > 7) {
        level = 'AAA';
      }
    }
    if (size >= 24) {
      if (ratio >= 3 && ratio < 4.5) {
        level = 'AA';
      } else if (ratio > 4.5) {
        level = 'AAA';
      }
    }
    return level;
  }
}
