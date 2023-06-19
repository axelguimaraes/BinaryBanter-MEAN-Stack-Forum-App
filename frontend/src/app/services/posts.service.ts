import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly API_URL = 'http://localhost:3000/api/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    const url = `${this.API_URL}`;
    return this.http.get<any>(url, { withCredentials: true }); // Include 'withCredentials' to send cookies
  }

  createPost(postData: any): Observable<any> {
    const url = `${this.API_URL}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers, withCredentials: true };

    return this.http.post<any>(url, postData, options);
  }

  updatePost(postId: string, postData: any): Observable<any> {
    const url = `${this.API_URL}/${postId}`;
    return this.http.put<any>(url, postData, { withCredentials: true }); // Include 'withCredentials' to send cookies
  }

  upvotePost(postId: string): Observable<any> {
    const url = `${this.API_URL}/${postId}/upvote`;
    return this.http.put<any>(url, null, { withCredentials: true });
  }

  downvotePost(postId: string): Observable<any> {
    const url = `${this.API_URL}/${postId}/downvote`;
    return this.http.put<any>(url, null, { withCredentials: true });
  }

  deletePost(postId: string): Observable<any> {
    const url = `${this.API_URL}/${postId}`;
    return this.http.delete<any>(url, { withCredentials: true }); // Include 'withCredentials' to send cookies
  }

  searchPostsByTags(tags: string[]): Observable<any> {
    const url = `${this.API_URL}/searchByTags`;
    const params = new HttpParams().set('tags', tags.join(',')); // Join the tags array with comma separator
    return this.http.get<any>(url, { params, withCredentials: true });
  }

  emitPostCreated() {
    this.postCreated.emit();
  }

  postCreated: EventEmitter<void> = new EventEmitter<void>();
}
