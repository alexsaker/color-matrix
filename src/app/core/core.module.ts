import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDialogModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatrixCustomSearchComponent } from './components/matrix-custom-search/matrix-custom-search.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ColorPaletteSaveModalComponent } from './components/color-palette-save-modal/color-palette-save-modal.component';
import { NavigationItemComponent } from './components/navigation-item/navigation-item.component';
import { ColorPaletteConfirmDeleteModalComponent } from '../color-palette/components/color-palette-confirm-delete-modal/color-palette-confirm-delete-modal.component';

const MODULES = [
  BrowserAnimationsModule,
  CommonModule,
  MatButtonModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonToggleModule,
  MatCardModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatInputModule
];
const DECLARATIONS = [
  NavigationComponent,
  PageNotFoundComponent,
  MatrixCustomSearchComponent,
  ColorPaletteSaveModalComponent,
  NavigationItemComponent,
  ColorPaletteConfirmDeleteModalComponent
];

@NgModule({
  imports: MODULES,
  declarations: DECLARATIONS,
  exports: [...MODULES, ...DECLARATIONS],
  entryComponents: [
    ColorPaletteSaveModalComponent,
    ColorPaletteConfirmDeleteModalComponent
  ]
})
export class CoreModule {}
