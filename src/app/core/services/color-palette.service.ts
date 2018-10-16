import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

import { ColorPalette } from '../models/color-palette.model';

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {
  private DEFAULT_COLOR_SPAN: string[] = [
    '#0D0D0D',
    '#1A1A1A',
    '#262626',
    '#333333',
    '#454545',
    '#6D6D6D',
    '#959595',
    '#BDBDBD',
    '#DCDCDC',
    '#E9E9E9',
    '#F7F7F7',
    '#FFFFFF',
    '#005EB8',
    '#00A9E0',
    '#9BCAEB',
    '#CE0058',
    '#6F2B8D',
    '#E95326',
    '#AB5C00',
    '#F7A827',
    '#FEEB3D',
    '#33D681',
    '#00A34E',
    '#00701B'
  ];
  constructor() {}

  public getDefaultColorPalette(): ColorPalette {
    const cp: ColorPalette = {
      id: uuid.v4(),
      title: 'Default',
      data: this.DEFAULT_COLOR_SPAN
    };
    return cp;
  }
}
