import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Guard simples: se não tiver ninguém logado, manda pro login em vez de abrir o perfil
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAutenticado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
