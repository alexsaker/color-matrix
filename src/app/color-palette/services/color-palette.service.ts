import { Injectable } from '@angular/core';
import * as uuidv4 from 'uuid/v4';

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
  public getDefaultColorPaletteAndSetLocalStorage(): ColorPalette {
    const cp: ColorPalette = {
      id: uuidv4(),
      label: 'Amadeus Default',
      data: this.DEFAULT_COLOR_SPAN
    };
    localStorage.setItem('colorPalettes', JSON.stringify([cp]));
    return cp;
  }

  public saveColorPalette(
    label: string,
    data: string[]
  ): { colorPalette: ColorPalette; error?: Error } {
    try {
      const cp: ColorPalette = {
        id: uuidv4(),
        label: label,
        data: data
      };
      const colorPalettesAsString: string = localStorage.getItem(
        'colorPalettes'
      );
      const colorPalettes: ColorPalette[] = JSON.parse(colorPalettesAsString);
      colorPalettes.push(cp);
      localStorage.setItem('colorPalettes', JSON.stringify(colorPalettes));
      return { colorPalette: cp };
    } catch (error) {
      return { colorPalette: null, error: error };
    }
  }

  public deleteColorPalette(id: string): { status: string; error?: Error } {
    try {
      const colorPalettesAsString: string = localStorage.getItem(
        'colorPalettes'
      );
      const colorPalettes: ColorPalette[] = JSON.parse(colorPalettesAsString);
      const updatedolorPalettes = colorPalettes.filter(cp => cp.id !== id);
      localStorage.setItem(
        'colorPalettes',
        JSON.stringify(updatedolorPalettes)
      );
      return { status: 'OK' };
    } catch (error) {
      return { status: 'FAILED', error: error };
    }
  }
}
