import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from '../services/thread.service';
import { Thread } from '../models/thread.model';
import { AddPostDialogComponent } from '../add-post-dialog/add-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
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

  addPost() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      width: '400px',
      data: {
        threadId: this.thread._id
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the post content from the dialog
        console.log('New post content:', result);
        // Perform any actions based on the post content
        // e.g., call a service to create the post
      }
    });
  }
}
