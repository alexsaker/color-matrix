import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatToolbarModule
} from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { SaveColorPalette } from '../../../color-palette/store/color-palette.actions';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { ToggleSidenav } from '../../../shared/store/app.actions';
import { Navigate } from '../../../shared/store/router.state';
import { ColorPaletteSaveModalComponent } from '../color-palette-save-modal/color-palette-save-modal.component';
import { NavigationComponent } from './navigation.component';
import { tick } from '@angular/core/src/render3';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: Store;
  let dialogRef: MatDialogRef<NavigationComponent>;
  let dialog: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([ColorPaletteState])
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        }
      ],
      declarations: [NavigationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.isHandset$ instanceof Observable).toBeTruthy();
  });

  it('should dispatch ToggleSidenav action when toggleSidenav method called', () => {
    spyOn(store, 'dispatch');
    component.toggleSidenav();
    expect(store.dispatch).toHaveBeenCalledWith(new ToggleSidenav());
  });

  it('should dispatch Navigate action to Home when goHome method called', () => {
    spyOn(store, 'dispatch');
    component.goHome();
    expect(store.dispatch).toHaveBeenCalledWith(new Navigate('/color-palette'));
  });

  it('should open colorPalette importation modal when openColorPaletteSaveModal method called', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of() });
    component.openColorPaletteSaveModal();
    expect(dialog.open).toHaveBeenCalledWith(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: { action: 'Create' }
    });
  });

  it('should dispatch SaveColorPalette when color palette modal closed an result not undefined', () => {
    const modalResult = { title: 'test', data: ['#777'] };
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(modalResult)
    });
    spyOn(store, 'dispatch');
    component.openColorPaletteSaveModal();
    expect(dialog.open).toHaveBeenCalledWith(ColorPaletteSaveModalComponent, {
      width: '500px',
      height: '500px',
      data: { action: 'Create' }
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new SaveColorPalette(modalResult)
    );
  });
});
