import {TestBed} from '@angular/core/testing';

import {AuthLogInGuard} from './auth-log-in.guard';

describe('AuthLogInGuard', () => {
  let guard: AuthLogInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthLogInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
