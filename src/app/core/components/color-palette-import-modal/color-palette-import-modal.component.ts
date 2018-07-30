import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { colorPaletteValidator } from './color-palette.validator';

@Component({
  selector: 'cm-color-palette-import-modal',
  templateUrl: './color-palette-import-modal.component.html',
  styleUrls: ['./color-palette-import-modal.component.scss']
})
export class ColorPaletteImportModalComponent implements OnInit {
  public jsonStatus: boolean;
  public importFormGroup: FormGroup;
  public readonly LABEL_MIN_LENGTH = 3;
  public readonly LABEL_MAX_LENGTH = 50;
  public get label() {
    return this.importFormGroup.get('label');
  }

  public get data() {
    return this.importFormGroup.get('data');
  }

  constructor(
    public dialogRef: MatDialogRef<ColorPaletteImportModalComponent>
  ) {}

  ngOnInit() {
    this.importFormGroup = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(this.LABEL_MIN_LENGTH),
        Validators.maxLength(this.LABEL_MAX_LENGTH)
      ]),
      data: new FormControl(null, [Validators.required, colorPaletteValidator])
    });
  }

  public importColorPalette() {
    this.dialogRef.close({
      label: this.label.value,
      data: JSON.parse(this.data.value)
    });
  }
  public cancel() {
    this.dialogRef.close();
  }
}
