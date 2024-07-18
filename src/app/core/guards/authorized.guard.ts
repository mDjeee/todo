import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../views/login/services/auth.service';

export const authorizedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  if(isAuthenticated) {
    return true;
  }
  return router.navigate(['/login']);
};
