import { Component, OnInit, Input } from '@angular/core';
import { ColorPalette } from '../../models/color-palette.model';

@Component({
  selector: 'cm-color-palette-list',
  templateUrl: './color-palette-list.component.html',
  styleUrls: ['./color-palette-list.component.scss']
})
export class ColorPaletteListComponent implements OnInit {
  @Input() colorPalettes: ColorPalette[];
  constructor() {}

  ngOnInit() {}
}
