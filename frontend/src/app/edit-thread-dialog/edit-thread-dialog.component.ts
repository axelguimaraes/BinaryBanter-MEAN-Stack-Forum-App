import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Thread } from '../models/thread.model';

@Component({
  selector: 'app-edit-thread-dialog',
  templateUrl: './edit-thread-dialog.component.html',
  styleUrls: ['./edit-thread-dialog.component.css'],
})
export class EditThreadDialogComponent implements OnInit {
  editThreadForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditThreadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Thread,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editThreadForm = this.formBuilder.group({
      description: [this.data.description],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    const updatedThread = {
      description: this.editThreadForm.value.description,
    };
    this.dialogRef.close(updatedThread);
  }
}
