import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedDateComponent } from './closed-date.component';

describe('ClosedDateComponent', () => {
  let component: ClosedDateComponent;
  let fixture: ComponentFixture<ClosedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
