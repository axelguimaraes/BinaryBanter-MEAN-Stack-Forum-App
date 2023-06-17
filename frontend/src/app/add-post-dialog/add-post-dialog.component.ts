import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostsService } from '../services/posts.service';
import { AuthService } from '../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css'],
})
export class AddPostDialogComponent implements OnInit {
  threadForm!: FormGroup;
  author: string = '';

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['LEI', 'LSIRC', 'Security', 'Development', 'Testing'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddPostDialogComponent>,
    private postsService: PostsService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private threadService: ThreadService
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

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
      author: this.author,
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
      thread: threadId,
      tags: this.tags,
    };

    this.postsService.createPost(postData).subscribe(
      (response) => {
        console.log('Post created:', response);
        this.postsService.emitPostCreated();
        this.dialogRef.close();

        const postId = response._id; // Extract the postId from the response

        const updatedThread = {
          postId: postId // Include the postId in the updatedThread object
        };

        this.threadService.addPostToThread(threadId, updatedThread).subscribe(
          (response) => {
            console.log('Post added to thread:', response);
          },
          (error) => {
            console.error('Error adding post to thread:', error);
          }
        );
      },
      (error) => {
        console.error('Error creating post:', error);
      }
    );
  }



  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }
}
