import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorPaletteDetailPageComponent } from './containers/color-palette-detail-page/color-palette-detail-page.component';
import { ColorPalettePageComponent } from './containers/color-palette-page/color-palette-page.component';
import { ColorPaletteExistsGuard } from './guards/color-palette-exists.guard';
import { DisplayToolbarMenuGuard } from './guards/display-toolbar-menu.guard';
import { HideToolbarMenuGuard } from './guards/hide-toolbar-menu.guard';

const routes: Routes = [
  {
    path: '',
    component: ColorPalettePageComponent,
    canActivate: [HideToolbarMenuGuard]
  },
  {
    path: ':id',
    component: ColorPaletteDetailPageComponent,
    canActivate: [ColorPaletteExistsGuard, DisplayToolbarMenuGuard]
  }
];

const GUARDS = [
  ColorPaletteExistsGuard,
  HideToolbarMenuGuard,
  DisplayToolbarMenuGuard
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [...GUARDS]
})
export class ColorPaletteRoutingModule {}
