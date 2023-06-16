import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User>;
  userId!: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userId = this.authService.getUserId() || '';
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUserProfile(this.userId);
  }

  editProfile(): void {
    //this.userService.updateUserProfile(this.userId)
    console.log('Edit Profile');
  }

  deleteProfile(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete your profile?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteAccount(this.userId).subscribe(() => {
          this.authService.logout();
          this.clearCookies();
          this.clearLocalStorage();
          this.router.navigate(['/']);
          this.showSnackbar('Profile deleted successfully!')
          window.location.reload()
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['../']);
  }

  private clearCookies(): void {
    document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
