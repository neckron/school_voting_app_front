import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  if (localStorage.getItem('currentUser')) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const stored = localStorage.getItem('currentUser');
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed?.user?.userrole === 'ADMIN') {
      return true;
    }
  }
  router.navigate(['/login']);
  return false;
};
