import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadComponent } from './actividades.component';

describe('ActividadesComponent', () => {
  let component: ActividadComponent;
  let fixture: ComponentFixture<ActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadComponent]
    });
    fixture = TestBed.createComponent(ActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
