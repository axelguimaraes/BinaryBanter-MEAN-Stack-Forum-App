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
  private username: string = '';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUserName(): string {
    return this.username;
  }

  login(username: string, password: string): Observable<any> {
    const loginUrl = 'http://localhost:3000/api/auth/login';

    return this.http.post(loginUrl, { username, password }).pipe(
      tap((response: any) => {
        this.authenticated = true;
        this.username = response.username;
      }),
      catchError((error: any) => {
        console.error('Login error', error);
        return of(error);
      })
    );
  }

  logout(): void {
    this.authenticated = false;
    this.username = '';
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
}
