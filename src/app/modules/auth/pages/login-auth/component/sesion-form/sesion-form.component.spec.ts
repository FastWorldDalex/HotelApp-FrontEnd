import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionFormComponent } from './sesion-form.component';

describe('SesionFormComponent', () => {
  let component: SesionFormComponent;
  let fixture: ComponentFixture<SesionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
