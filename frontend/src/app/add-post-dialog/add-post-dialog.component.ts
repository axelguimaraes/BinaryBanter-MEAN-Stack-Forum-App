import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  selectedFile: File | null = null;
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
      file: ['']
    });
  }

  fetchAuthor(): void {
    this.author = localStorage.getItem('username') || '';
    this.threadForm.patchValue({
      author: this.author
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (this.threadForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const threadId = this.data.threadId;
    const author = this.author;
    const postData = this.threadForm.value;

    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('thread', threadId);
    formData.append('author', author);

    this.postsService.createPost(threadId, formData).subscribe(
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
