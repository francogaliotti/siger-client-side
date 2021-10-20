import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMainViaticoComponent } from './view-main-viatico.component';

describe('ViewMainViaticoComponent', () => {
  let component: ViewMainViaticoComponent;
  let fixture: ComponentFixture<ViewMainViaticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMainViaticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMainViaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
