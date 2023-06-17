import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './login-dialog/dialog.component';
import { AuthService } from './services/auth.service';
import { AddThreadDialogComponent } from './add-thread-dialog/add-thread-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isLoggedIn: boolean = false;
  username$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  showAddThreadButton: boolean = false;
  userId!: string;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.checkedLoggedInStatus();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username$.next(storedUsername);
    }
    this.userId = this.authService.getUserId() || '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is the home route
        const isHomeRoute =
          this.route.snapshot.firstChild?.routeConfig?.path === '';

        // Hide the "Add Thread" button if not on the home route
        this.showAddThreadButton = isHomeRoute;
      }
    });
  }

  openLoginDialog() {
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

      if (this.isLoggedIn) {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          this.username$.next(storedUsername);
        }
      } else {
        this.username$.next('');
      }
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
        this.username$.next('');
        window.location.reload();
        this.showSnackbar('Logout successful!');
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

  /*
  openAddThreadDialog(): void {
    const dialogRef = this.dialog.open(AddThreadDialogComponent, {
      width: '30%',
      height: '70%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog closed with result:', result);
    });
  }
  */

  openAddThreadDialog(): void {
    const dialogRef = this.dialog.open(AddThreadDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with: ', result);
    })
  }

  goToProfile() {
    this.router.navigate(['/user', this.userId]);
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
