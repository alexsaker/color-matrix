import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync
} from '@angular/core/testing';

import { NavigationItemComponent } from './navigation-item.component';
import { Navigate } from '../../../shared/store/router.state';
import {
  MatDialogRef,
  MatDialog,
  MatDialogModule,
  MatIconModule
} from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component';
import { ColorPaletteState } from '../../../color-palette/store/color-palette.state';
import { Store, NgxsModule } from '@ngxs/store';
import { CloseSidenav } from '../../../shared/store/app.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavigationItemComponent', () => {
  let component: NavigationItemComponent;
  let fixture: ComponentFixture<NavigationItemComponent>;
  let store: Store;
  let dialogRef: MatDialogRef<NavigationComponent>;
  let dialog: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        BrowserAnimationsModule,
        NgxsModule.forRoot([ColorPaletteState])
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['afterClosed'])
        }
      ],
      declarations: [NavigationItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationItemComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    dialog = TestBed.get(MatDialog);
    dialogRef = TestBed.get(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
});
