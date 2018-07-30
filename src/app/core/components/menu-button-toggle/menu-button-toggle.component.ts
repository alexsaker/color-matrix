import { Component, OnInit } from '@angular/core';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ColorPaletteMatrix } from '../../../color-palette/models/color-palette-matrix.model';
import { SetSelectedMatrix } from '../../../color-palette/store/color-palette.actions';

@Component({
  selector: 'cm-menu-button-toggle',
  templateUrl: './menu-button-toggle.component.html',
  styleUrls: ['./menu-button-toggle.component.scss']
})
export class MenuButtonToggleComponent implements OnInit {
  @Select(ColorPaletteState.colorPaletteMatrices)
  colorPalettesMatrices$: Observable<ColorPaletteMatrix[]>;

  public colorPalettesMatrices: ColorPaletteMatrix[] = [];
  constructor(private store: Store) {}

  ngOnInit() {}
  public selectMatrix(id: number): void {
    this.store.dispatch(new SetSelectedMatrix(id));
  }
}
