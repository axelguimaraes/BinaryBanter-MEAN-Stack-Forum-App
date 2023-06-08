import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './login-dialog/dialog.component';
import { AuthService } from './services/auth.service';
import { AddPostComponent } from './add-post/add-post.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false;
  username: string = ''

  constructor(
    private dialog: MatDialog,
    private addPostDialog: MatDialog,
    private authService: AuthService
  ) {
    this.checkedLoggedInStatus();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  openDialog() {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(
      DialogComponent,
      {
        width: '30%',
        height: '70%',
        data: {
          isLoggedIn: this.isLoggedIn,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result);
      this.isLoggedIn = result?.isLoggedIn;
    });
  }

  openAddPostDialog() {
    this.addPostDialog.open(AddPostComponent, {
      width: '400px',
    });
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        // Remove the token from the cookie
        document.cookie =
          'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');

        this.isLoggedIn = false;
        window.location.reload();
      },
      (error: any) => {
        console.error('Logout error:', error);
      }
    );
  }

  checkedLoggedInStatus() {
    const token = this.authService.getAuthTokenFromCookie();
    this.isLoggedIn = !!token;
  }
}
