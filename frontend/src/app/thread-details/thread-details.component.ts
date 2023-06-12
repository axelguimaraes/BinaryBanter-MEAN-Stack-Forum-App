import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';
import { Thread } from '../models/thread.model';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css'],
})
export class ThreadDetailsComponent implements OnInit {
  thread!: Thread;
  posts: Post[] = [];
  loggedInUserId!: string;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private router: Router,
    private dialog: MatDialog,
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedInUserId = this.authService.getUserId() || '';
    this.route.paramMap.subscribe((params) => {
      const threadId = params.get('id');
      this.threadService.getThreadById(threadId!).subscribe((response) => {
        this.thread = response;
        this.fetchPostsForThread();
      });
    });

    this.postsService.postCreated.subscribe(() => {
      this.fetchPostsForThread();
    });
  }


  fetchPostsForThread() {
    this.postsService.getPosts().subscribe((response) => {
      // Filter the posts based on the thread ID
      this.posts = response.filter(
        (post: { thread: { _id: string } }) =>
          post.thread._id === this.thread._id
      );
      console.log(this.posts);
    });
  }

  goBack() {
    this.router.navigate(['../']); // Navigate to the previous page
  }

  addPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '400px',
      data: {
        threadId: this.thread._id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Handle the post content from the dialog
        console.log('New post content:', result);
        // Perform any actions based on the post content
        // e.g., call a service to create the post
        this.fetchPostsForThread(); // Fetch the updated list of posts
      }
    });
  }

  editPost(post: Post) {
    // Navigate to the edit post page passing the post ID
    this.router.navigate(['/edit-post', post._id]);
  }

  deletePost(post: Post) {
    this.postsService.deletePost(post._id).subscribe(
      (response) => {
        console.log('Post deleted:', response);
        this.fetchPostsForThread(); // Fetch the updated list of posts
      },
      (error) => {
        console.error('Error deleting post:', error);
      }
    );
  }

  deleteThread() {

  }

}
