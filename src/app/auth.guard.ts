import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');
    if (token && !this.isTokenExpired(token)) {
      return true; // Allow access to the route
    }

    // Redirect to the login page if no token or token is expired
    this.router.navigate(['/login']);
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
      return decoded.exp < currentTime; // Check if token is expired
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Assume token is invalid if decoding fails
    }
  }
}