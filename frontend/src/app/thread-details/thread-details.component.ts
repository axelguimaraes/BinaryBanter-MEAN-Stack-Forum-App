import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {
  thread!: Thread;

  constructor(
    private route: ActivatedRoute,
    private threadService: ThreadService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const threadId = params.get('id');
      this.threadService.getThreadById(threadId!).subscribe(response => {
        this.thread = response;
      });
    });
  }

  goBack() {
    this.router.navigate(['../']); // Navigate to the previous page
  }
}
