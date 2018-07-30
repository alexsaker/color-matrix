import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MatButtonModule,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SaveColorPalette } from '../../../color-palette/store/color-palette.actions';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { Navigate } from '../../../shared/store/router.state';
import { ColorPaletteImportModalComponent } from '../color-palette-import-modal/color-palette-import-modal.component';
import { CloseSidenav, ToggleSidenav } from '../../../shared/store/app.actions';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let store: Store;
  let dialogRef: MatDialogRef<NavigationComponent>;
  let dialog: MatDialog;
  beforeEach(
    fakeAsync(() => {
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
    })
  );

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.sidenavTitle).toEqual('CM');
    expect(component.isHandset$ instanceof Observable).toBeTruthy();
  });

  it('should dispatch ToggleSidenav action when toggleSidenav method called', () => {
    spyOn(store, 'dispatch');
    component.toggleSidenav();
    expect(store.dispatch).toHaveBeenCalledWith(new ToggleSidenav());
  });

  it('should dispatch Navigate action when displayMatrix method called', () => {
    spyOn(store, 'dispatch');
    const id = '49805fbc-11da-40ec-be35-c10774f22739';
    component.displayColorPalette(id);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Navigate('/color-palette/' + id)
    );
  });

  it('should dispatch CloseSidenav action when displayMatrix method called', () => {
    spyOn(store, 'dispatch');
    const id = '49805fbc-11da-40ec-be35-c10774f22739';
    component.displayColorPalette(id);
    expect(store.dispatch).toHaveBeenCalledWith(new CloseSidenav());
  });

  it('should dispatch Navigate action to Home when goHome method called', () => {
    spyOn(store, 'dispatch');
    component.goHome();
    expect(store.dispatch).toHaveBeenCalledWith(new Navigate('/color-palette'));
  });

  it('should open colorPalette importation modal when openColorPaletteImportModal method called', () => {
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of() });
    component.openColorPaletteImportModal();
    expect(dialog.open).toHaveBeenCalledWith(ColorPaletteImportModalComponent, {
      width: '500px',
      height: '500px'
    });
  });

  it('should dispatch SaveColorPalette when color palette modal closed an result not undefined', () => {
    const modalResult = { label: 'test', data: ['#777'] };
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(modalResult)
    });
    spyOn(store, 'dispatch');
    component.openColorPaletteImportModal();
    expect(dialog.open).toHaveBeenCalledWith(ColorPaletteImportModalComponent, {
      width: '500px',
      height: '500px'
    });
    expect(store.dispatch).toHaveBeenCalledWith(
      new SaveColorPalette(modalResult.label, modalResult.data)
    );
  });
});
