import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { ThreadService } from '../services/thread.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-search-tags-dialog',
  templateUrl: './search-tags-dialog.component.html',
  styleUrls: ['./search-tags-dialog.component.css'],
})
export class SearchTagsDialogComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  form!: FormGroup;
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

  tagInput!: ElementRef<HTMLInputElement>;
  announcer = inject(LiveAnnouncer);

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private postService: PostsService,
    private router: Router,
    private dialogRef: MatDialogRef<SearchTagsDialogComponent, Post[]>
  ) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tags: new FormControl([]),
    });
  }

  onSubmit(): void {
    const selectedTags = this.tags.map((tag) =>
      tag.toUpperCase().replace(/\s+/g, '_')
    );
    this.postService.searchPostsByTags(selectedTags).subscribe(
      (result) => {
        // Handle the search result
        this.dialogRef.close(result)

      },
      (error) => {
        // Handle the error
        console.error(error);
        this.showSnackbar('No posts found with the selected tags!')
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
