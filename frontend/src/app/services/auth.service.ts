import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { response } from 'express';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated: boolean = false;
  private email: string = '';
  private username: string = '';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUserName(): string {
    return this.username;
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = 'http://localhost:3000/api/auth/login';

    return this.http.post(loginUrl, { email, password }).pipe(
      tap((response: any) => {
        // Assuming the server response includes an authentication token
        const authToken = response.token;

        // Save the authentication token in local storage
        localStorage.setItem('authToken', authToken);

        this.authenticated = true;
        this.email = response.email;
        this.username = response.username;
      }),
      catchError((error: any) => {
        console.error('Login error', error);
        return of(error);
      })
    );
  }

  logout(): Observable<any> {
    const logoutUrl = 'http://localhost:3000/api/auth/logout';

    return this.http.post(logoutUrl, localStorage.getItem('currentUser')).pipe(
      tap((response: any) => {
        this.authenticated = false;
        this.email = '';
      }),
      catchError((error: any) => {
        console.error('Logout error', error);
        return of(error);
      })
    );
  }

  register(username: string, password: string): Observable<any> {
    const registerUrl = 'http://localhost:3000/api/auth/register';

    return this.http.post(registerUrl, { username, password }).pipe(
      catchError((error: any) => {
        console.error('Register error', error);
        return of(error);
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
