import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Autenticar } from '../services/autenticar';

export const adminGuard: CanActivateFn = () => {
  const autenticar = inject(Autenticar);
  const router = inject(Router);

  if (autenticar.esAdmin()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
