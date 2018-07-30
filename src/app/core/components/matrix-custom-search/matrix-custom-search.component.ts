import { FontWeight } from '../../../color-palette/enums/font-weight.enum';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { Observable } from 'rxjs';
import { SetSuitableMatrix } from '../../../color-palette/store/color-palette.actions';

@Component({
  selector: 'cm-matrix-custom-search',
  templateUrl: './matrix-custom-search.component.html',
  styleUrls: ['./matrix-custom-search.component.scss']
})
export class MatrixCustomSearchComponent implements OnInit {
  @Select(ColorPaletteState.colorPaletteSizes)
  colorPalettesSizes$: Observable<string[]>;
  @Select(ColorPaletteState.colorPaletteFontWeights)
  colorPalettesFontWeights$: Observable<string[]>;
  public customPaletteSearch: FormGroup;
  constructor(private store: Store) {}

  ngOnInit() {
    this.customPaletteSearch = new FormGroup({
      size: new FormControl(),
      fontWeight: new FormControl()
    });
    this.customPaletteSearch.valueChanges.subscribe(changes => {
      this.setSelectedMatrix(changes.size, changes.fontWeight);
    });
  }

  private setSelectedMatrix(size: number, fontWeight: FontWeight): void {
    this.store.dispatch(new SetSuitableMatrix(size, fontWeight));
  }
}
