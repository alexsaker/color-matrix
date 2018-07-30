import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonToggleModule } from '@angular/material';
import { NgxsModule, Store } from '@ngxs/store';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { SetSelectedMatrix } from '../../../color-palette/store/color-palette.actions';
import { MenuButtonToggleComponent } from './menu-button-toggle.component';

describe('MenuButtonToggleComponent', () => {
  let component: MenuButtonToggleComponent;
  let fixture: ComponentFixture<MenuButtonToggleComponent>;
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonToggleModule, NgxsModule.forRoot([ColorPaletteState])],
      declarations: [MenuButtonToggleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonToggleComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch SetSelectedMatrix on selectMatrix call', () => {
    spyOn(store, 'dispatch');
    const id = 1;
    component.selectMatrix(id);
    expect(store.dispatch).toHaveBeenCalledWith(new SetSelectedMatrix(id));
  });
});
