import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  getUserProfile(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/:id`, { withCredentials: true });
  }

  updateUserProfile(username: string, email: string): Observable<User> {
    const payload = { username, email };
    return this.http.put<User>(`${this.apiUrl}/profile`, payload);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/account`);
  }
}
