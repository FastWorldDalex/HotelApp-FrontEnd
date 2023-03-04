import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRolesComponent } from './new-roles.component';

describe('NewRolesComponent', () => {
  let component: NewRolesComponent;
  let fixture: ComponentFixture<NewRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
