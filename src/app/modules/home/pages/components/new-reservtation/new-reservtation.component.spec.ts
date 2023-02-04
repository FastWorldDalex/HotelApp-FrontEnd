import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReservtationComponent } from './new-reservtation.component';

describe('NewReservtationComponent', () => {
  let component: NewReservtationComponent;
  let fixture: ComponentFixture<NewReservtationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReservtationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReservtationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
