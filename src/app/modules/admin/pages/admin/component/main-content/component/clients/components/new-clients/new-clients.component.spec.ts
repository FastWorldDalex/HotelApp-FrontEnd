import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClientsComponent } from './new-clients.component';

describe('NewClientsComponent', () => {
  let component: NewClientsComponent;
  let fixture: ComponentFixture<NewClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
