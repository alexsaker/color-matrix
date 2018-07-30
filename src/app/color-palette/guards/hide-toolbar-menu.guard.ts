import { ColorPaletteRoutingModule } from '../color-palette-routing.module';
import { Injectable } from '@angular/core';
import { CanDeactivate, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';

import { HideMatrixToolbarForm } from '../../shared/store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class HideToolbarMenuGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): boolean {
    this.store.dispatch(new HideMatrixToolbarForm());
    return true;
  }
}
