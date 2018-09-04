import { ColorPalette } from '../../models/color-palette.model';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { ColorPaletteState } from '../../store/color-palette.state';

@Component({
  selector: 'cm-color-palette-page',
  templateUrl: './color-palette-page.component.html',
  styleUrls: ['./color-palette-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPalettePageComponent implements OnInit {
  @Select(ColorPaletteState.colorPalettes)
  colorPalettes$: Observable<ColorPalette[]>;
  constructor(private store: Store) {}

  ngOnInit() {}
}
