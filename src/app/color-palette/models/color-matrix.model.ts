import { FontWeight } from './../enums/font-weight.enum';

export interface ColorMatrixCell {
  backgroundColor: string;
  foregroundColor: string;
  style: Object;
  title: string;
  compliance: string;
  ratio: string;
}
export interface ColorMatrixSelection {
  size: number;
  fontWeight: FontWeight;
}
