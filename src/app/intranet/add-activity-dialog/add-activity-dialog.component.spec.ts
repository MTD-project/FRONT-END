import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityDialogComponent } from './add-activity-dialog.component';

describe('AddActivityDialogComponent', () => {
  let component: AddActivityDialogComponent;
  let fixture: ComponentFixture<AddActivityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddActivityDialogComponent]
    });
    fixture = TestBed.createComponent(AddActivityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
