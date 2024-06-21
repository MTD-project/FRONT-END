import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLoggedinComponent } from './header-loggedin.component';

describe('HeaderLoggedinComponent', () => {
  let component: HeaderLoggedinComponent;
  let fixture: ComponentFixture<HeaderLoggedinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderLoggedinComponent]
    });
    fixture = TestBed.createComponent(HeaderLoggedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
