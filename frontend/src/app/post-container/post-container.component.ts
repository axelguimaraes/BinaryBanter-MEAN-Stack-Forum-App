import { Component, OnInit } from '@angular/core';
import { PostsRestService } from '../services/posts.rest.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.css']
})
export class PostContainerComponent implements OnInit {
  posts: any[] = [];

  constructor(private postsRestService: PostsRestService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.postsRestService.postCreated.subscribe(() => {
      this.fetchPosts();
    });
  }

  fetchPosts() {
    this.postsRestService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
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
