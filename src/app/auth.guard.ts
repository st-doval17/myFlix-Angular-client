import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if user data exists in local storage
    const userData = localStorage.getItem('user');

    if (userData) {
      // User data exists, allow access
      return true;
    } else {
      // User data doesn't exist, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
