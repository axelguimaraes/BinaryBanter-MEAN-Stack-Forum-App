import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';
import { Thread } from '../models/thread.model';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css'],
})
export class ThreadDetailsComponent implements OnInit, OnDestroy {
  thread!: Thread;
  posts: Post[] = [];
  loggedInUserId!: string;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  showScrollTopButton = false;
  private scrollListener!: EventListenerOrEventListenerObject;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private router: Router,
    private dialog: MatDialog,
    private postsService: PostsService,
    private authService: AuthService,
    private snackBar: MatSnackBar
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

    this.scrollListener = () => this.handleScroll();
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  handleScroll(): void {
    // Show/hide scroll-to-top button based on scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollTopButton = scrollTop > 0;
  }

  scrollToTop(): void {
    // Scroll the page to the top
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        console.log('New post content:', result);
         this.fetchPostsForThread();
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
        this.showSnackbar('Post deleted successfully!')
      },
      (error) => {
        this.showSnackbar('Error deleting post!')
        console.error('Error deleting post:', error);
      }
    );
  }

  deleteThread() {
    this.threadService.deleteThreadById(this.thread._id).subscribe(
      (response) => {
        console.log('Thread deleted: ', response);
        this.showSnackbar('Thread deleted successfully!')
        this.goBack()
      },
      (error) => {
        console.error('Error deleting thread: ', error)
        this.showSnackbar('Error deleting thread!')
      }
    )
  }

  upvotePost(post: Post) {
    // Perform the upvote logic here, e.g., call a service method
    // to increase the upvote count for the post
    this.postsService.upvotePost(post._id).subscribe(
      (response) => {
        console.log('Post upvoted:', response);
        post.upvotes++; // Increase the upvote count in the UI
      },
      (error) => {
        console.error('Error upvoting post:', error);
      }
    );
  }

  downvotePost(post: Post) {
    // Perform the downvote logic here, e.g., call a service method
    // to decrease the upvote count for the post
    this.postsService.downvotePost(post._id).subscribe(
      (response) => {
        console.log('Post downvoted:', response);
        post.upvotes--; // Decrease the upvote count in the UI
      },
      (error) => {
        console.error('Error downvoting post:', error);
      }
    );
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
