import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsRestService } from '../services/posts.rest.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';

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
    private postsRestService: PostsRestService,
    private authService: AuthService
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
        author: this.authService.getAuthTokenFromCookie(), // Use the authentication token as the author value
      };

      this.postsRestService
        .createPost(newPost)
        .pipe(
          tap(() => {
            this.postsRestService.emitPostCreated();
            this.dialogRef.close();
          }),
          catchError((error) => {
            console.error('Error creating post:', error);
            return of(null); // Return an observable with a null value to continue the observable chain
          })
        )
        .subscribe();
    } else {
      console.error('Form is not valid');
    }
  }


  close() {
    this.dialogRef.close();
  }
}
