import {
  Component,
  Inject,
  OnInit,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../models/post.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.css'],
})
export class EditPostDialogComponent implements OnInit {
  editPostForm!: FormGroup;
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

  constructor(
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      postId: string;
      title: string;
      content: string;
      tags: string[];
    }
  ) // ...
  {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      title: [this.data.title],
      content: [this.data.content],
      tags: [this.data.tags],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.editPostForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const postId = this.data.postId;
    const updatedPostData = {
      title: this.editPostForm.value.title,
      content: this.editPostForm.value.content,
      tags: this.tags.map((tag) => tag.toUpperCase().replace(/\s+/g, '_')),
    };

    this.postsService.updatePost(postId, updatedPostData).subscribe(
      (response) => {
        console.log('Post updated:', response);
        this.dialogRef.close();

        this.showSnackbar('Post updated successfully!');
      },
      (error) => {
        console.error('Error updating post:', error);
        this.showSnackbar('Error updating post!');
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
