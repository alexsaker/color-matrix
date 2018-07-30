import { FontWeight } from '../enums/font-weight.enum';
import { ColorPalette } from '../models/color-palette.model';

export class LoadColorPalettes {
  static readonly type = '[ColorPalette] LoadColorPalettes';
}

export class SaveColorPalette {
  static readonly type = '[ColorPalette] SaveColorPalette';
  constructor(public label: string, public data: string[]) {}
}
export class DeleteColorPalette {
  static readonly type = '[ColorPalette] DeleteColorPalette';
  constructor(public id: string) {}
}

export class SetErrors {
  static readonly type = '[ColorPalette] SetErrors';
  constructor(public errors: Error[]) {}
}

export class SetSelectedColorPalette {
  static readonly type = '[ColorPalette] SetSelectedColorPalette';
  constructor(public id?: string) {}
}

export class SetSelectedMatrix {
  static readonly type = '[ColorPalette] SetSelectedMatrix';
  constructor(public id: number) {}
}
export class SetSuitableMatrix {
  static readonly type = '[ColorPalette] SetSuitableMatrix';
  constructor(public size: number, public fontWeight: FontWeight) {}
}

export class LoadColorMatrix {
  static readonly type = '[ColorPalette] LoadColorPalette';
  constructor(public colorPalette: ColorPalette, public size: number) {}
}

export class LoadColorMatrices {
  static readonly type = '[ColorPalette] LoadColorMatrices';
  constructor(public colorPalette: ColorPalette, public sizes: number[]) {}
}
