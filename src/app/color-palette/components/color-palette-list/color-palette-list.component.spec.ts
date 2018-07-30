import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '../../../../../node_modules/@angular/core';
import { ColorPaletteListComponent } from './color-palette-list.component';

describe('ColorPaletteListComponent', () => {
  let component: ColorPaletteListComponent;
  let fixture: ComponentFixture<ColorPaletteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPaletteListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
