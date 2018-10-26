import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibilityInfoPanelComponent } from './accessibility-info-panel.component';

describe('AccessibilityInfoPanelComponent', () => {
  let component: AccessibilityInfoPanelComponent;
  let fixture: ComponentFixture<AccessibilityInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessibilityInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessibilityInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
