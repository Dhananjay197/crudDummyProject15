import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService } from './api.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const service = inject(ApiService);

  const currentmenu = route.url[0]?.path;
  const user = sessionStorage.getItem('user');
  
  if (currentmenu === "dashboard") {
    debugger
    if (user && service.loginUser(user)) {
      return true;
    } else {
      alert('Please login first');
      router.navigate(['/login']);
      return false;
    }
  }

  return true;
};
