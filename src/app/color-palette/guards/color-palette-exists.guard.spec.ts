import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ColorPaletteState } from '../store/color-palette.state';
import { ColorPaletteExistsGuard } from './color-palette-exists.guard';

export const DEFAULT_STATE = {
  colorPalettes: {
    ids: ['49805fbc-11da-40ec-be35-c10774f22739']
  }
};

describe('ColorPaletteExistsGuard', () => {
  let store: Store;
  let colorPaletteExistsGuard: ColorPaletteExistsGuard;
  let activatedRouteSnapshot: ActivatedRouteSnapshot;
  let routerStateSnapshot: RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ColorPaletteState])],
      providers: [
        ColorPaletteExistsGuard,
        Store,
        {
          provide: ActivatedRouteSnapshot,
          useValue: jasmine.createSpyObj('ActivatedRouteSnapshot', ['toString'])
        },
        {
          provide: RouterStateSnapshot,
          useValue: jasmine.createSpyObj('RouterStateSnapshot', ['toString'])
        }
      ]
    });
    store = TestBed.get(Store);
    store.reset(DEFAULT_STATE);
    colorPaletteExistsGuard = TestBed.get(ColorPaletteExistsGuard);
    activatedRouteSnapshot = TestBed.get(ActivatedRouteSnapshot);
    routerStateSnapshot = TestBed.get(RouterStateSnapshot);
  });

  describe('CanActivate', () => {
    it('should be true if id is found in ids state array', () => {
      routerStateSnapshot.url =
        '/color-palette/49805fbc-11da-40ec-be35-c10774f22739';
      const result = colorPaletteExistsGuard.canActivate(
        activatedRouteSnapshot,
        routerStateSnapshot
      );
      expect(result).toBeTruthy();
    });
    it('should be false if id is found in ids state array', () => {
      routerStateSnapshot.url =
        '/color-palette/49805fbc-11da-40ec-be35-c10774f22888';
      colorPaletteExistsGuard
        .canActivate(activatedRouteSnapshot, routerStateSnapshot)
        .subscribe(result => {
          expect(result).toBeFalsy();
        });
    });
  });
});
