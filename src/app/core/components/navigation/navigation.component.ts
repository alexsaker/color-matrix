import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ColorPalette } from '../../../color-palette/models/color-palette.model';
import { SaveColorPalette } from '../../../color-palette/store/color-palette.actions';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { CloseSidenav, ToggleSidenav } from '../../../shared/store/app.actions';
import { Navigate } from '../../../shared/store/router.state';
import { ColorPaletteSaveModalComponent } from '../color-palette-save-modal/color-palette-save-modal.component';

@Component({
  selector: 'cm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Select(state => state.app.isSidenavOpened)
  isSidenavOpened$: Observable<boolean>;
  @Select(state => state.app.isMatrixToolbarFormVisible)
  isMatrixToolbarFormVisible$: Observable<boolean>;
  @Select(ColorPaletteState.colorPalettes)
  colorPalettes$: Observable<ColorPalette[]>;
  public isHandset$: Observable<boolean>;
  public sidenavTitle: string;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit() {
    this.sidenavTitle = 'CM';
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map(result => result.matches));
  }

  public toggleSidenav() {
    this.store.dispatch(new ToggleSidenav());
  }

  public goHome() {
    this.store.dispatch(new Navigate('/color-palette'));
  }

  public openColorPaletteSaveModal() {
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
}