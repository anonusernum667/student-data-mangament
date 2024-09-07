import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private apiUrl = 'https://66d4a3985b34bcb9ab3f1f84.mockapi.io/students/v1/admins'; // Replace with your API endpoint

  constructor(private http: HttpClient, private router: Router) {}

  // Login method that calls the API to validate credentials
  login(adminEmail: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}`).pipe(
      map((admins) => {
        const found = admins.find(
          (admin) => admin.adminEmail === adminEmail && admin.password === password
        );

        if (found) {
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true'); // Save login state
          localStorage.setItem('userEmail', found.adminEmail); // Save user email
          localStorage.setItem('userPassword', found.password); // Save user password (consider security implications)
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return of(false);
      })
    );
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }

  // Logout method
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
