import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsRestService } from '../services/posts.rest.service';

export interface Post {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPostComponent>,
    @Inject(MAT_DIALOG_DATA) private posts: Post[],
    private postsRestService: PostsRestService
  ) {}

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost = {
        title: this.postForm.get('title')!.value,
        content: this.postForm.get('content')!.value,
      };

      this.postsRestService.createPost(newPost).subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
