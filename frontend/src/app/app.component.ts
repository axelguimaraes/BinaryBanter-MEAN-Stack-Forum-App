import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn: boolean = false; // Set this based on authentication status

  constructor(private dialog: MatDialog, private authService: AuthService) {
    this.checkedLoggedInStatus();
  }

  openDialog() {
    const dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      width:'30%',
      height:'70%',
      data: {
        isLoggedIn: this.isLoggedIn
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      // Update the values of username and isLoggedIn based on the result, if needed
      this.isLoggedIn = result?.isLoggedIn;
    });
  }

  logout(){
    this.authService.logout()
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    window.location.reload()
  }

  checkedLoggedInStatus() {
    const token = localStorage.getItem('currentUser')
    this.isLoggedIn = !!token;
  }
}
