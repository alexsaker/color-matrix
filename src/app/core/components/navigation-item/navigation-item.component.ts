import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngxs/store';

import { ColorPaletteConfirmDeleteModalComponent } from '../../../color-palette/components/color-palette-confirm-delete-modal/color-palette-confirm-delete-modal.component';
import { ColorPalette } from '../../../color-palette/models/color-palette.model';
import {
  DeleteColorPalette,
  SaveColorPalette
} from '../../../color-palette/store/color-palette.actions';
import { CloseSidenav } from '../../../shared/store/app.actions';
import { Navigate } from '../../../shared/store/router.state';
import { ColorPaletteSaveModalComponent } from '../color-palette-save-modal/color-palette-save-modal.component';

@Component({
  selector: 'cm-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {
  @Input()
  colorPalette: ColorPalette;
  public isOver: boolean;
  @HostListener('mouseover')
  onMouseOver() {
    this.isOver = true;
  }
  @HostListener('mouseout')
  onMouseOut() {
    this.isOver = false;
  }
  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit() {
    this.isOver = false;
  }

  public displayColorPalette(id: string) {
    this.store.dispatch(new Navigate('/color-palette/' + id));
    this.store.dispatch(new CloseSidenav());
  }
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
}
