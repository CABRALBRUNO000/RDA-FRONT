import { TestBed } from '@angular/core/testing';

import { FormCadVolunteersResolverGuard } from './form-cad-volunteers-resolver.guard';

describe('FormCadVolunteersResolverGuard', () => {
  let guard: FormCadVolunteersResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormCadVolunteersResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
