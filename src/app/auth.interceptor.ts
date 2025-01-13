import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the token from localStorage
    const token = localStorage.getItem('jwtToken');

    // Clone the request and add the Authorization header
    if (token) {
      if(this.isTokenExpired(token)){
        localStorage.removeItem('jwtToken');
        this.router.navigate(['/login']);
        return next.handle(request.clone());
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        ()=>{},
        (error)=>{
          if(error.status == 401){
            this.router.navigate(['/login']);
          }
        }
      )
    );
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
