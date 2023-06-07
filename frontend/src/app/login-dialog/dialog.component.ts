import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isRegisterForm: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar
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

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  switchToRegister() {
    this.isRegisterForm = true;
  }

  submitForm() {
    if (this.isRegisterForm) {
      if (this.registerForm.valid) {
        const username = this.registerForm.get('username')!.value;
        const email = this.registerForm.get('email')!.value;
        const password = this.registerForm.get('password')!.value;

        // Rearrange the payload object
        const payload = {
          username: username,
          email: email,
          password: password
        };

        this.authService.register(payload).subscribe({
          next: (response: any) => {
            if (response && response.success) {
              this.dialogRef.close();
              this.showSnackbar('Registration successful');
            } else {
              alert('Registration error');
            }
          },
          error: (error: any) => {
            alert('Registration error');
          }
        });
      }
    } else {
      if (this.loginForm.valid) {
        const email = this.loginForm.get('email')!.value;
        const password = this.loginForm.get('password')!.value;

        this.authService.login(email, password).subscribe({
          next: (response: any) => {
            if (response && response.token) {
              // Store the token as a cookie
              document.cookie = `auth-token=${response.token}; max-age=3600; path=/;`;
              localStorage.setItem('authToken', response.token);

              const result = {
                isLoggedIn: true,
              };

              this.dialogRef.close(result);
            } else {
              alert('Login error');
            }
          },
          error: (error: any) => {
            alert('Login error');
          }
        });
      }
    }
  }


  getErrorMessage(formControlName: string) {
    const formControl = this.isRegisterForm ? this.registerForm.get(formControlName) : this.loginForm.get(formControlName);

    if (formControl && formControl.hasError('required')) {
      return 'Field is required';
    }

    if (formControl && formControl.hasError('email')) {
      return 'Invalid email format';
    }

    if (formControl && formControl.hasError('minlength')) {
      const minLength = formControl.errors!['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }

    return '';
  }

  customAsyncValidator(control: FormControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
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

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // 3 seconds
    });
  }
}
