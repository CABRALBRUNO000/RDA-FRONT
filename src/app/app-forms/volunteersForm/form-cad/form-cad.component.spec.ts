import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadComponent } from './form-cad.component';

describe('FormCadComponent', () => {
  let component: FormCadComponent;
  let fixture: ComponentFixture<FormCadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
