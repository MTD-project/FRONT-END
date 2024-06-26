import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgottComponent } from './forgott.component';

describe('ForgottComponent', () => {
  let component: ForgottComponent;
  let fixture: ComponentFixture<ForgottComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgottComponent]
    });
    fixture = TestBed.createComponent(ForgottComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
