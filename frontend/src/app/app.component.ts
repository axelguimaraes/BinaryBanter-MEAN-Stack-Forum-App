import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './login-dialog/dialog.component';
import { AuthService } from './services/auth.service';
import { AddThreadDialogComponent } from './add-thread-dialog/add-thread-dialog.component';
import { Observable } from 'rxjs';
import { of, BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

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

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.checkedLoggedInStatus();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username$.next(storedUsername);
    }
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

  openAddThreadDialog(): void {
    const dialogRef = this.dialog.open(AddThreadDialogComponent, {
      width: '400px',
      height: '400px',
      // Set the width of the dialog as per your requirements
      // You can pass additional data to the dialog using the `data` property
      // For example: data: { userId: '123' }
    });

    // Subscribe to the dialog's afterClosed() event to get the result when the dialog is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      // Handle the result or perform any necessary actions
      console.log('Dialog closed with result:', result);
    });
  }
}
