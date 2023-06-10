import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  private baseUrl = 'http://localhost:3000/api/thread';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getAllThreads(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createThread(threadData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, threadData, { withCredentials: true });
  }

  getThreadById(threadId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${threadId}`);
  }

  updateThreadById(threadId: string, threadData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${threadId}`, threadData);
  }

  deleteThreadById(threadId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${threadId}`);
  }

  emitThreadCreated() {
    this.threadCreated.emit()
  }

  threadCreated: EventEmitter<void> = new EventEmitter<void>();
}
