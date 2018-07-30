import { log } from 'util';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ColorMatrixElement } from '../../models/color-matrix.model';

@Component({
  selector: 'cm-matrix-cell',
  templateUrl: './matrix-cell.component.html',
  styleUrls: ['./matrix-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixCellComponent implements OnInit {
  @Input() data: ColorMatrixElement;
  @Input() type: string;
  constructor() {}

  ngOnInit() {
  }
}
