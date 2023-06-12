import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css'],
})
export class AddPostDialogComponent implements OnInit {
  threadForm!: FormGroup;
  author: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddPostDialogComponent>,
    private postsService: PostsService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createThreadForm();
    this.fetchAuthor();
  }

  createThreadForm(): void {
    this.threadForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      author: [{ value: this.author, disabled: true }, Validators.required],
    });
  }

  fetchAuthor(): void {
    this.author = localStorage.getItem('username') || '';
    this.threadForm.patchValue({
      author: this.author
    });
  }

  onSubmit() {
    if (this.threadForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const threadId = this.data.threadId;
    const author = this.author;

    const postData = {
      ...this.threadForm.value,
      author: author,
      thread: threadId
    };

    this.postsService.createPost(postData).subscribe(
      (response) => {
        console.log('Post created:', response);
        this.postsService.emitPostCreated();
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }
}
