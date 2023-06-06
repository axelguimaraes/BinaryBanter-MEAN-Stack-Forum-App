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
    const authToken = localStorage.getItem('currentUser');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    return this.http.post<any>(this.API_URL, postData, { headers });
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
