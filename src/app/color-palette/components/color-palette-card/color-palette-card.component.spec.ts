import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatMenuModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { ColorPaletteState } from '../../store/color-palette.state';
import { ColorPaletteConfirmDeleteModalComponent } from '../color-palette-confirm-delete-modal/color-palette-confirm-delete-modal.component';
import { ColorPaletteCardComponent } from './color-palette-card.component';
import { DeleteColorPalette } from '../../store/color-palette.actions';

describe('ColorPaletteCardComponent', () => {
  let component: ColorPaletteCardComponent;
  let fixture: ComponentFixture<ColorPaletteCardComponent>;
  let store: Store;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ColorPaletteCardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        NgxsModule.forRoot([ColorPaletteState])
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        }
      ],
      declarations: [ColorPaletteCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletteCardComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open color palette confirmation modal with color palette title when deleteColorPalette method called', () => {
    const modalResult = true;
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(modalResult)
    });
    component.colorPalette = {
      id: '49805fbc-11da-40ec-be35-c10774f22739',
      title: 'test',
      data: ['#555']
    };
    component.deleteColorPalette(component.colorPalette.id);
    expect(dialog.open).toHaveBeenCalledWith(
      ColorPaletteConfirmDeleteModalComponent,
      {
        width: '550px',
        data: {
          title: 'test'
        }
      }
    );
  });

  it('should dispatch DeleteColorPalette action when delete confirmation dialog  closes with confirmation', () => {
    const modalResult = true;
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(modalResult)
    });
    spyOn(store, 'dispatch');
    component.colorPalette = {
      id: '49805fbc-11da-40ec-be35-c10774f22739',
      title: 'test',
      data: ['#555']
    };
    component.deleteColorPalette(component.colorPalette.id);
    expect(store.dispatch).toHaveBeenCalledWith(
      new DeleteColorPalette(component.colorPalette.id)
    );
  });
  it('should not dispatch DeleteColorPalette action when delete confirmation dialog  closes without confirmation', () => {
    const modalResult = null;
    spyOn(dialog, 'open').and.returnValue({
      afterClosed: () => of(modalResult)
    });
    spyOn(store, 'dispatch');
    component.colorPalette = {
      id: '49805fbc-11da-40ec-be35-c10774f22739',
      title: 'test',
      data: ['#555']
    };
    component.deleteColorPalette(component.colorPalette.id);
    expect(store.dispatch).not.toHaveBeenCalledWith(
      new DeleteColorPalette(component.colorPalette.id)
    );
  });
});
