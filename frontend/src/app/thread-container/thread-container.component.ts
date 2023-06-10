import { Component, OnInit } from '@angular/core';
import { Thread } from '../models/thread.model';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-thread-container',
  templateUrl: './thread-container.component.html',
  styleUrls: ['./thread-container.component.css']
})
export class ThreadContainerComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private threadService: ThreadService) {}

  ngOnInit(): void {
    this.fetchThreads();
    this.threadService.threadCreated.subscribe(()=>{
      this.fetchThreads();
    })
  }

  fetchThreads(): void {
    this.threadService.getAllThreads().subscribe(
      (threads: Thread[]) => {
        this.threads = threads;
      },
      (error: any) => {
        console.error('Error fetching threads:', error);
      }
    );
  }
}
