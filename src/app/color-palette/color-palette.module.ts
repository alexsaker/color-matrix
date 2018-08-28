import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { NgxsModule } from '@ngxs/store';

import { ColorPaletteRoutingModule } from './color-palette-routing.module';
import { ColorPaletteCardComponent } from './components/color-palette-card/color-palette-card.component';
import { ColorPaletteListComponent } from './components/color-palette-list/color-palette-list.component';
import { MatrixCellComponent } from './components/matrix-cell/matrix-cell.component';
import { MatrixTableComponent } from './components/matrix-table/matrix-table.component';
import { ColorPaletteDetailPageComponent } from './containers/color-palette-detail-page/color-palette-detail-page.component';
import { ColorPalettePageComponent } from './containers/color-palette-page/color-palette-page.component';
import { ColorMatrixService } from './services/color-matrix.service';
import { ColorPaletteService } from './services/color-palette.service';
import { ColorPaletteState } from './store/color-palette.state';

const MODULES = [
  CommonModule,
  ColorPaletteRoutingModule,
  LayoutModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatDialogModule,
  MatMenuModule,
  NgxsModule.forFeature([ColorPaletteState])
];

const DECLARATIONS = [
  ColorPalettePageComponent,
  ColorPaletteDetailPageComponent,
  ColorPaletteDetailPageComponent,
  MatrixTableComponent,
  MatrixCellComponent,
  ColorPaletteListComponent,
  ColorPaletteCardComponent
];

@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  providers: [ColorPaletteService, ColorMatrixService],
  entryComponents: []
})
export class ColorPaletteModule {}
