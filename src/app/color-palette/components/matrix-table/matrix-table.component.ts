import { ColorPalette } from '../../models/color-palette.model';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ColorPaletteMatrix } from '../../models/color-palette-matrix.model';
import { ColorMatrixService } from '../../services/color-matrix.service';

@Component({
  selector: 'cm-matrix-table',
  templateUrl: './matrix-table.component.html',
  styleUrls: ['./matrix-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixTableComponent implements OnInit {
  @Input() colorPalette: ColorPalette;
  @Input() selectedMatrix: ColorPaletteMatrix;
  constructor(private colorMatrixService: ColorMatrixService) {}
  ngOnInit() {}
  public computeColorMatrixData(
    backgroundColor: string,
    foregroundColor: string,
    size: number
  ) {
    return this.colorMatrixService.computeColorMatrixData(
      backgroundColor,
      foregroundColor,
      size
    );
  }
}
