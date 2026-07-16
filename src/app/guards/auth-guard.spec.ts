import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';
import { adminGuard } from './auth-guard';
import { Autenticar } from '../services/autenticar';

describe('adminGuard', () => {
  let autenticar: Autenticar;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    autenticar = TestBed.inject(Autenticar);
    router = TestBed.inject(Router);
  });

  it('debe permitir el acceso cuando el usuario logueado es administrador', () => {
    autenticar.login('admin', 'Admin1');

    const resultado = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    expect(resultado).toBe(true);
  });

  it('debe denegar el acceso y redirigir a /login cuando el usuario no es administrador', () => {
    autenticar.login('juanito', 'Juan1');
    vi.spyOn(router, 'navigate');

    const resultado = TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

    expect(resultado).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
