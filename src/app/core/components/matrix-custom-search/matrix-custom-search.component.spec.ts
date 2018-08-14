import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { NgxsModule, Store } from '@ngxs/store';
import { range } from 'lodash';

import { FontWeight } from '../../../color-palette/enums/font-weight.enum';
import { SetSuitableMatrix } from '../../../color-palette/store/color-palette.actions';
import {
  ColorPaletteState,
  RANGE_END,
  RANGE_START
} from '../../../color-palette/store/color-palette.state';
import { MatrixCustomSearchComponent } from './matrix-custom-search.component';

export const DEFAULT_STATE = {
  colorPalettes: {
    ids: ['49805fbc-11da-40ec-be35-c10774f22739'],
    sizeGroup: [11, 19, 24],
    sizes: range(RANGE_START, RANGE_END),
    fontWeights: [FontWeight.LIGHT, FontWeight.NORMAL, FontWeight.BOLD]
  }
};
describe('MatrixCustomSearchComponent', () => {
  let component: MatrixCustomSearchComponent;
  let fixture: ComponentFixture<MatrixCustomSearchComponent>;
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
        NgxsModule.forRoot([ColorPaletteState])
      ],
      providers: [],
      declarations: [MatrixCustomSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixCustomSearchComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    store.reset(DEFAULT_STATE);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.customPaletteSearch instanceof FormGroup).toBeTruthy();
    expect(
      component.customPaletteSearch.get('size') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.customPaletteSearch.get('fontWeight') instanceof FormControl
    ).toBeTruthy();
  });

  it('should call setSelectedMatrix on size change', () => {
    spyOn<any>(component, 'setSelectedMatrix');
    component.customPaletteSearch.patchValue({ size: 8 });
    expect(component['setSelectedMatrix']).toHaveBeenCalledWith(8, null);
  });
  it('should call setSelectedMatrix on fontWeight change', () => {
    spyOn<any>(component, 'setSelectedMatrix');
    component.customPaletteSearch.patchValue({ fontWeight: FontWeight.NORMAL });
    expect(component['setSelectedMatrix']).toHaveBeenCalledWith(
      null,
      FontWeight.NORMAL
    );
  });

  it('should dispatch SetSuitableMatrix action on setSelectedMatrix call', () => {
    spyOn(store, 'dispatch');
    component['setSelectedMatrix'](8, FontWeight.NORMAL);
    expect(store.dispatch).toHaveBeenCalledWith(
      new SetSuitableMatrix(8, FontWeight.NORMAL)
    );
  });
});
