import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPaletteImportModalComponent } from './color-palette-import-modal.component';

describe('ColorPaletteImportModalComponent', () => {
  let component: ColorPaletteImportModalComponent;
  let fixture: ComponentFixture<ColorPaletteImportModalComponent>;
  let dialogRef: MatDialogRef<ColorPaletteImportModalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatFormFieldModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        }
      ],
      declarations: [ColorPaletteImportModalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteImportModalComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize', () => {
    expect(
      component.importFormGroup.get('label') instanceof FormControl
    ).toBeTruthy();
    expect(
      component.importFormGroup.get('data') instanceof FormControl
    ).toBeTruthy();
  });
  it('should return an invalid form when empty', () => {
    expect(component.importFormGroup.invalid).toBeTruthy();
  });

  it('should return a valid form', () => {
    expect(component.importFormGroup.valid).toBeFalsy();
    component.importFormGroup.controls['label'].setValue('test');
    component.importFormGroup.controls['data'].setValue('["#777"]');
    const label = component.importFormGroup.controls['label'];
    const data = component.importFormGroup.controls['data'];
    expect(label.valid).toBeTruthy();
    expect(data.valid).toBeTruthy();
    expect(component.importFormGroup.valid).toBeTruthy();
  });

  it('should return an invalid form when label is not set', () => {
    component.importFormGroup.controls['label'].setValue(undefined);
    const label = component.importFormGroup.controls['label'];
    expect(label.valid).toBeFalsy();
  });

  it('should return an invalid form when label length is under 3', () => {
    component.importFormGroup.controls['label'].setValue('te');
    const label = component.importFormGroup.controls['label'];
    expect(label.valid).toBeFalsy();
  });

  it('should return an invalid form when label length is over 50', () => {
    component.importFormGroup.controls['label'].setValue(
      new Array(51 + 1).join('t')
    );
    const label = component.importFormGroup.controls['label'];
    expect(label.valid).toBeFalsy();
  });

  it('should return an invalid form when data is not set', () => {
    component.importFormGroup.controls['data'].setValue(undefined);
    const data = component.importFormGroup.controls['data'];
    expect(data.valid).toBeFalsy();
  });

  it('should return an invalid form when data is not a JSON parsable value', () => {
    component.importFormGroup.controls['data'].setValue([]);
    const data = component.importFormGroup.controls['data'];
    expect(data.valid).toBeFalsy();
  });

  it('should close modal on importColorPalette method call', () => {
    component.importColorPalette();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should close modal on cancel method call', () => {
    component.cancel();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
