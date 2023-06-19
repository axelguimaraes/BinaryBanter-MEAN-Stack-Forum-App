import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SearchTagsDialogComponent } from '../search-tags-dialog/search-tags-dialog.component';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  showScrollTopButton = false;
  private scrollListener!: EventListenerOrEventListenerObject;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private threadService: ThreadService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.fetchThreads();
    this.threadService.threadCreated.subscribe(() => {
      this.fetchThreads();
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

  fetchThreads(): void {
    this.threadService.getAllThreads().subscribe(
      (threads: Thread[]) => {
        this.threads = threads.sort((a, b) => {
          // Sort threads based on creation date in descending order
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
      },
      (error: any) => {
        console.error('Error fetching threads:', error);
      }
    );
  }

  openSearchByTagsDialog(): void {
    const dialogRef = this.dialog.open(SearchTagsDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Post[]) => {
      if (result) {
        this.router.navigate(['/searchResults'], { state: { posts: result } });
      }
    });
  }
}
