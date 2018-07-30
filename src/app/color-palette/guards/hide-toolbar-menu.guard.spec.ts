import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { HideMatrixToolbarForm } from '../../shared/store/app.actions';
import { HideToolbarMenuGuard } from './hide-toolbar-menu.guard';

describe('HideToolbarMenuGuard', () => {
  let store: Store;
  let hideToolbarMenuGuard: HideToolbarMenuGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
      providers: [HideToolbarMenuGuard, Store]
    });
    store = TestBed.get(Store);
    hideToolbarMenuGuard = TestBed.get(HideToolbarMenuGuard);
  });
  describe('CanActivate', () => {
    it('should dispatchHideMatrixToolbarForm action and return true', () => {
      spyOn(store, 'dispatch');

      const result = hideToolbarMenuGuard.canActivate();

      expect(store.dispatch).toHaveBeenCalledWith(new HideMatrixToolbarForm());
      expect(result).toBeTruthy();
    });
  });
});
