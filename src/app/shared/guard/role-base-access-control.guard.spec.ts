import { TestBed } from '@angular/core/testing';

import { RoleBaseAccessControlGuard } from './role-base-access-control.guard';

describe('RoleBaseAccessControlGuard', () => {
  let guard: RoleBaseAccessControlGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleBaseAccessControlGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
