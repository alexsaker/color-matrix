import { ColorPalette } from '../../models/color-palette.model';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';
import { Component, OnInit, Input } from '@angular/core';
import {
  DeleteColorPalette,
  SaveColorPalette
} from '../../store/color-palette.actions';
import { ColorPaletteConfirmDeleteModalComponent } from '../color-palette-confirm-delete-modal/color-palette-confirm-delete-modal.component';
import { Navigate } from '../../../shared/store/router.state';
import { ColorPaletteSaveModalComponent } from '../../../core/components/color-palette-save-modal/color-palette-save-modal.component';
import * as uuidv4 from 'uuid/v4';
@Component({
  selector: 'cm-color-palette-card',
  templateUrl: './color-palette-card.component.html',
  styleUrls: ['./color-palette-card.component.scss']
})
export class ColorPaletteCardComponent implements OnInit {
  @Input()
  colorPalette: ColorPalette;
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit() {}

  public deleteColorPalette(id: string): void {
    const dialogRef = this.dialog.open(
      ColorPaletteConfirmDeleteModalComponent,
      {
        width: '550px',
        data: {
          title: this.colorPalette.title
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new DeleteColorPalette(id));
      }
    });
  }
  public editColorPalette(id: string): void {
    const dialogRef = this.dialog.open(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        action: 'Edit',
        colorPalette: this.colorPalette
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new SaveColorPalette(result));
      }
    });
  }

  public duplicateColorPalette(id: string): void {
    const duplicatedColorPalette = {
      id: uuidv4(),
      title: `${this.colorPalette.title}_Copy`,
      data: this.colorPalette.data
    } as ColorPalette;
    this.store.dispatch(new SaveColorPalette(duplicatedColorPalette));
    const dialogRef = this.dialog.open(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        action: 'Edit',
        colorPalette: duplicatedColorPalette
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new SaveColorPalette(result));
      }
    });
  }

  public goToColorPalette(): void {
    this.store.dispatch(new Navigate('/color-palette/' + this.colorPalette.id));
  }
}
