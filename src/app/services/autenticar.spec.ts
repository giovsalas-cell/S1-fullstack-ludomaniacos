import { TestBed } from '@angular/core/testing';

import { Autenticar } from './autenticar';

describe('Autenticar', () => {
  let service: Autenticar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Autenticar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
