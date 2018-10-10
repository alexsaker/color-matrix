import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ColorPaletteState } from '../store/color-palette.state';

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteExistsGuard implements CanActivate {
  @Select(ColorPaletteState.colorPaletteIds)
  colorPaletteIds$: Observable<string[]>;

  constructor(private store: Store) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.colorPaletteIds$.pipe(
      map(ids => ids.indexOf(state.url.split('/').pop()) !== -1)
    );
  }
}
