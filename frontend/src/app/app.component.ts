import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './login-dialog/dialog.component';
import { AuthService } from './services/auth.service';
import { AddThreadDialogComponent } from './add-thread-dialog/add-thread-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './services/app.service';
import { SearchTagsDialogComponent } from './search-tags-dialog/search-tags-dialog.component';
import { Post } from './models/post.model';

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
  logoImageUrl!: string;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.checkedLoggedInStatus();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username$.next(storedUsername);
    }
    this.userId = this.authService.getUserId() || '';
  }

  ngOnInit(): void {
    this.appService.getAppLogoImageUrl().subscribe(
      (response) => {
        this.logoImageUrl = 'http://localhost:3000' + response.logoImageUrl;
      },
      (error) => {
        console.error('Error fetching app logo image URL: ', error);
      }
    );

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

  openAddThreadDialog(): void {
    const dialogRef = this.dialog.open(AddThreadDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed with: ', result);
    })
  }

  openSearchByTagsDialog(): void {
    const dialogRef = this.dialog.open(SearchTagsDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result: Post[]) => {
      if (result) {
        this.router.navigate(['/searchResults'], { state: { posts: result } });
      }
    });
  }


  goToProfile() {
    this.router.navigate(['/user', this.userId]);
  }

  goHome() {
    this.router.navigate(['/'])
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
