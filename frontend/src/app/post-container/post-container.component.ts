import { Component, OnInit } from '@angular/core';
import { PostsRestService } from '../services/posts.rest.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsRestService: PostsRestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchPosts();
    this.postsRestService.postCreated.subscribe(() => {
      this.fetchPosts();
    });
  }

  fetchPosts() {
    this.postsRestService.getPosts()
      .pipe(
        tap((response) => {
          this.posts = response;
        }),
        catchError((error) => {
          console.error('Error fetching posts', error);
          return of(null); // Return an observable with a null value to continue the observable chain
        })
      )
      .subscribe();
  }


  openAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Fetch the latest post list after the dialog is closed
      this.fetchPosts();
    });
  }
}
