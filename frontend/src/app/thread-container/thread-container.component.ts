import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit, OnDestroy {
  threads: Thread[] = [];
  pageSize = 25;
  pageIndex = 0;
  totalThreads = 0;
  showScrollTopButton = false;
  private scrollListener!: EventListenerOrEventListenerObject;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private threadService: ThreadService) {}

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
        this.threads = threads;
        this.totalThreads = threads.length;
        this.pageIndex = 0;
        this.paginator.firstPage();
      },
      (error: any) => {
        console.error('Error fetching threads:', error);
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
  }
}
