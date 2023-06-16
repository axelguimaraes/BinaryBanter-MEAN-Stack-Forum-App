// edit-profile-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css'],
})
export class EditProfileDialogComponent implements OnInit {
  editProfileForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editProfileForm = this.formBuilder.group({
      username: [this.data.username],
      email: [this.data.email],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    // Handle the form submission and update the user profile
    const updatedProfile = {
      username: this.editProfileForm.value.username,
      email: this.editProfileForm.value.email,
      // Add other fields if needed
    };

    // Call the relevant service method to update the user profile

    this.dialogRef.close(updatedProfile);
  }
}
