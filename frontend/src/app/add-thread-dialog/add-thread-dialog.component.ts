import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ThreadService } from '../services/thread.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-add-thread-dialog',
  templateUrl: './add-thread-dialog.component.html',
  styleUrls: ['./add-thread-dialog.component.css']
})
export class AddThreadDialogComponent implements OnInit {
  threadForm!: FormGroup;
  author: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddThreadDialogComponent>,
    private threadService: ThreadService
  ) {}

  ngOnInit(): void {
    this.createThreadForm();
    this.fetchAuthor();
  }

  createThreadForm(): void {
    this.threadForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      author: [{ value: this.author, disabled: true }, Validators.required]
    });
  }

  fetchAuthor(): void {
    this.author = localStorage.getItem('username') || '';
    this.threadForm.patchValue({
      author: this.author
    });
  }

  onSubmit(): void {
    if (this.threadForm.invalid) {
      return;
    }

    const threadData = {
      name: this.threadForm.value.name,
      description: this.threadForm.value.description,
      author: this.author
    };

    this.threadService.createThread(threadData).pipe(
      tap((response: any) => {
        // Thread created successfully
        console.log('Thread created:', response);
        this.threadService.emitThreadCreated();
        this.dialogRef.close();
      }),
      catchError((error: any) => {
        // Error occurred while creating thread
        console.error('Thread creation error:', error);
        // Handle the error and display an appropriate message to the user
        return of(null); // Return an observable with a null value to continue the observable chain
      })
    ).subscribe();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
