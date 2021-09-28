import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMainEstadoBoletaComponent } from './view-main-estado-boleta.component';

describe('ViewMainEstadoBoletaComponent', () => {
  let component: ViewMainEstadoBoletaComponent;
  let fixture: ComponentFixture<ViewMainEstadoBoletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMainEstadoBoletaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMainEstadoBoletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
