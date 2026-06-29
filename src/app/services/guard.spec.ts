import { TestBed } from '@angular/core/testing';
import { adminGuard } from '../guards/auth-guard';

describe('adminGuard', () => {
  it('debe existir', () => {
    expect(adminGuard).toBeTruthy();
  });
});
