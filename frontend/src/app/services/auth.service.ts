import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated: boolean = false;
  private email: string = '';
  private username: string = '';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUserName(): string {
    return this.username;
  }

  getUserId(): string | null {
    const authToken = this.getAuthToken();
    if (!authToken) {
      return null;
    }

    const tokenParts = authToken.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload || !payload.userId) {
      return null;
    }

    return payload.userId;
  }

  private getAuthToken(): string | null {
    const authToken = document.cookie
      .split(';')
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith('auth-token='));

    if (!authToken) {
      return null;
    }

    return authToken.split('=')[1];
  }

  login(email: string, password: string): Observable<any> {
    const loginUrl = 'http://localhost:3000/api/auth/login';

    return this.http.post(loginUrl, { email, password }).pipe(
      tap((response: any) => {
        const authToken = response.token;
        const username = response.username;

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('username', username);

        this.authenticated = true;
        this.email = response.email;
        this.username = username;
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

  register(payload: any): Observable<any> {
    const registerUrl = 'http://localhost:3000/api/auth/register';

    return this.http.post(registerUrl, payload).pipe(
      catchError((error: any) => {
        console.error('Register error', error);
        return of(error);
      })
    );
  }

  getAuthTokenFromCookie(): string | null {
    return this.cookieService.get('auth-token');
  }
}
