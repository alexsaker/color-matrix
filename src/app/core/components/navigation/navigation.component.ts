import { ColorPalette } from './../../models/color-palette.model';
import { ColorPaletteSaveModalComponent } from './../../../core/components/color-palette-save-modal/color-palette-save-modal.component';
import { HeaderType } from './../../../core/enums/header.enum';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';

import { SaveColorPalette } from '../../../core/state/color-palette.actions';
import { ColorPaletteState } from '../../../core/state/color-palette.state';
import { ColorPaletteConfirmDeleteModalComponent } from './../../../color-palette/components/color-palette-confirm-delete-modal/color-palette-confirm-delete-modal.component';
import { DeleteColorPalette } from './../../../core/state/color-palette.actions';

@Component({
  selector: 'cm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Select(ColorPaletteState.selectedColorPalette)
  selectedColorPalette$: Observable<ColorPalette>;

  @Select(ColorPaletteState.colorPalettes)
  colorPalettes$: Observable<ColorPalette[]>;

  public currentHeaderType: HeaderType;
  public HeaderType = HeaderType;
  public selectedColorPaletteSnapShot: ColorPalette;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedColorPalette$.subscribe(selectedColorPalette => {
      this.selectedColorPaletteSnapShot = selectedColorPalette;
    });

    this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if (events.url.match(/^\/color\-palette$/)) {
          this.currentHeaderType = HeaderType.COLOR_PALETTE;
        } else if (events.url.match(/^\/color\-palette\/help$/)) {
          this.currentHeaderType = HeaderType.HELP;
        } else if (events.url.match(/^\/color\-palette\/[\w+\-]+$/)) {
          this.currentHeaderType = HeaderType.DETAILED_COLOR_PALETTE;
        } else {
          this.currentHeaderType = null;
        }
      }
    });
  }

  public goToHelp() {
    this.router.navigate(['/color-palette/help']);
  }
  public goBackToColorPaletteList() {
    this.router.navigate(['/color-palette']);
  }

  public createColorPalette() {
    const dialogRef = this.dialog.open(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        action: 'Create'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new SaveColorPalette(result));
      }
    });
  }

  public editColorPalette(id: string): void {
    const dialogRef = this.dialog.open(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: {
        action: 'Edit',
        colorPalette: this.selectedColorPaletteSnapShot
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new SaveColorPalette(result));
      }
    });
  }

  public deleteColorPalette(id: string): void {
    const dialogRef = this.dialog.open(
      ColorPaletteConfirmDeleteModalComponent,
      {
        width: '550px',
        data: {
          title: this.selectedColorPaletteSnapShot.title
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.store.dispatch(new DeleteColorPalette(id));
      }
    });
  }

  public duplicateColorPalette(id: string): void {
    const duplicatedColorPalette = {
      id: uuid.v4(),
      title: `${this.selectedColorPaletteSnapShot.title}_Copy`,
      data: this.selectedColorPaletteSnapShot.data
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
}
