import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';

import { DisplayMatrixToolbarForm } from '../../shared/store/app.actions';

@Injectable({
  providedIn: 'root'
})
export class DisplayToolbarMenuGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): boolean {
    this.store.dispatch(new DisplayMatrixToolbarForm());
    return true;
  }
}
