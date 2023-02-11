import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRoomsComponentComponent } from './new-rooms.component.component';

describe('NewRoomsComponentComponent', () => {
  let component: NewRoomsComponentComponent;
  let fixture: ComponentFixture<NewRoomsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRoomsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRoomsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
