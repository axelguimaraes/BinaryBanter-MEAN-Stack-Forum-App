import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private readonly API_URL = 'http://localhost:3000/api/logo';

  constructor(private http: HttpClient) {}

  getAppLogoImageUrl(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
}
