import { CanActivateFn, Router  } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './services/auth-service.service';
export const authGuard: CanActivateFn = (route, state) => {
  // Inject the required services here (no need for constructor)
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access to the route
  } else {
    // Redirect to login if the user is not authenticated
    router.navigate(['/login']);
    return false;
  }
};
