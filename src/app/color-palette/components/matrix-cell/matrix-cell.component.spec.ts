import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixCellComponent } from './matrix-cell.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '../../../../../node_modules/@angular/core';

describe('MatrixCellComponent', () => {
  let component: MatrixCellComponent;
  let fixture: ComponentFixture<MatrixCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixCellComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
