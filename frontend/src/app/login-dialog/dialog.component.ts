import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [this.customAsyncValidator.bind(this)],
          updateOn: 'blur',
        },
      ],
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;

      this.authService.login(email, password).subscribe(
        (response: any) => {
          if (response && response.token) {
            // Store the token as a cookie
            document.cookie = `auth-token=${response.token}; max-age=3600; path=/;`;
            localStorage.setItem('authToken', response.token);

            const result = {
              isLoggedIn: true
            };

            this.dialogRef.close(result);
            //window.location.reload()
          } else {
            alert('Login error');
          }
        },
        (error: any) => {
          alert('Login error');
        }
      );
    }
  }


  getErrorMessage() {
    const emailFormControl = this.loginForm.get('email');

    if (emailFormControl && emailFormControl.hasError('required')) {
      return 'Email is required';
    }

    return 'Invalid email format';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl && passwordControl.hasError('required')) {
      return 'Password is required.';
    }
    return 'Invalid password.';
  }

  customAsyncValidator(
    control: FormControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    // Perform your async validation logic here
    // Example: Simulate async validation that resolves after 2 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'password123') {
          resolve({ invalidPassword: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
