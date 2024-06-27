import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAreaDialogComponent } from './add-area-dialog.component';

describe('AddAreaDialogComponent', () => {
  let component: AddAreaDialogComponent;
  let fixture: ComponentFixture<AddAreaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAreaDialogComponent]
    });
    fixture = TestBed.createComponent(AddAreaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
