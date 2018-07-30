import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ColorPaletteState } from '../../store/color-palette.state';
import { Observable } from 'rxjs';
import { ColorPaletteMatrix } from '../../models/color-palette-matrix.model';
import { ActivatedRoute } from '@angular/router';
import { SetSelectedColorPalette } from '../../store/color-palette.actions';

@Component({
  selector: 'cm-color-palette-detail-page',
  templateUrl: './color-palette-detail-page.component.html',
  styleUrls: ['./color-palette-detail-page.component.scss']
})
export class ColorPaletteDetailPageComponent implements OnInit {
  @Select(ColorPaletteState.selectedColorPalette)
  selectedColorPalette$: Observable<string[]>;
  @Select(ColorPaletteState.selectedMatrix)
  selectedMatrix$: Observable<ColorPaletteMatrix>;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.store.dispatch(new SetSelectedColorPalette(p.id));
    });
  }
}
