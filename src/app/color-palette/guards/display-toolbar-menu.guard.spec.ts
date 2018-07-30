import { inject, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { ColorPaletteState } from '../store/color-palette.state';
import { DisplayToolbarMenuGuard } from './display-toolbar-menu.guard';

describe('DisplayToolbarMenuGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ColorPaletteState])],
      providers: [DisplayToolbarMenuGuard]
    });
  });

  it('should ...', inject(
    [DisplayToolbarMenuGuard],
    (guard: DisplayToolbarMenuGuard) => {
      expect(guard).toBeTruthy();
    }
  ));
});
