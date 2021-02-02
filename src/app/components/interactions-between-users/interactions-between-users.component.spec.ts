import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionsBetweenUsersComponent } from './interactions-between-users.component';

describe('InteractionsBetweenUsersComponent', () => {
  let component: InteractionsBetweenUsersComponent;
  let fixture: ComponentFixture<InteractionsBetweenUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteractionsBetweenUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionsBetweenUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
