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
} from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
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
  allTags: string[] = [
    'LEI',
    'LSIRC',
    'Algebra Linear e Geometria Analitica',
    'Fisica Aplicada',
    'Fundamentos de Programacao',
    'Introducao aos Sistemas Computacionais',
    'Laboratorio de Programacao',
    'Engenharia de Software I',
    'Matematica Computacional I',
    'Matematica Discreta',
    'Paradigmas de Programacao',
    'Sistemas Digitais e Arquitetura de Computadores',
    'Engenharia de Software II',
    'Estruturas de Dados',
    'Matematica Computacional II',
    'Processamento Estruturado de Informacao',
    'Sistemas Operativos',
    'Analise Algoritmica e Otimizacao',
    'Bases de Dados',
    'Gestao de Projetos Informaticos',
    'Programacao em Ambiente Web',
    'Redes de Computadores',
    'Administracao de Sistemas Informaticos',
    'Computacao Movel e Ubiqua',
    'Laboratorio de Desenvolvimento de Software',
    'Sistemas de Informacao',
    'Sistemas Distribuidos',
    'Inteligencia Artificial',
    'Projeto Final',
    'Sistemas de Informacao Organizacionais',
    'Ciencias Empresariais (opcional)',
    'Nocoes de Gestao (opcional)',
    'Psicossociologia do Trabalho (opcional)',
    'Tecnicas de Informacao e Comunicacao (opcional)',
    'Etica e Legislacao Informatica',
    'Ingles Tecnico',
    'Seguranca Informatica',
    'Analise Forense Digital',
    'Redes de Computadores II',
    'Criptografia Aplicada',
    'Projecao e Planeamento de Redes',
    'Seguranca de Redes',
    'Sistemas Criticos',
    'Sistemas de Gestao de Seguranca da Informacao',
    'Testes de Penetracao e Hacking Etico',
    'Auditoria Informatica',
    'Programacao Segura',
  ];

  @ViewChild('fruitInput')
  tagInput!: ElementRef<HTMLInputElement>;

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
    this.threadForm = this.formBuilder.group({
      selectedToppings: new FormControl(this.tags),
    });
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
      tags: this.tags.map((tag) => tag.toUpperCase().replace(/\s+/g, '_')),
    };

    this.postsService.createPost(postData).subscribe(
      (response) => {
        console.log('Post created:', response);
        this.postsService.emitPostCreated();
        this.dialogRef.close();

        const postId = response._id;

        const updatedThread = {
          postId: postId,
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

  addChip(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const existingTag = this.allTags.find(
      (tag) => tag.toLowerCase() === value.toLowerCase()
    );

    if (existingTag && !this.tags.includes(existingTag)) {
      this.tags.push(existingTag);
      this.announcer.announce(`Added ${existingTag}`);
    } else {
      this.showSnackbar('Please select a valid tag!');
    }

    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }

  removeChip(chip: string): void {
    const index = this.tags.indexOf(chip);

    if (index >= 0) {
      this.tags.splice(index, 1);

      this.announcer.announce(`Removed ${chip}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
