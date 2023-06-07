import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsRestService {
  private readonly API_URL = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  createPost(postData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers, withCredentials: true };

    return this.http.post<any>(this.API_URL, postData, options);
  }

  private getCookie(name: string): string {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() || '' : '';
  }


  updatePost(postId: string, postData: any): Observable<any> {
    const url = `${this.API_URL}/${postId}`;
    return this.http.put<any>(url, postData);
  }

  deletePost(postId: string): Observable<any> {
    const url = `${this.API_URL}/${postId}`;
    return this.http.delete<any>(url);
  }

  emitPostCreated() {
    this.postCreated.emit();
  }

  postCreated: EventEmitter<void> = new EventEmitter<void>();
}
