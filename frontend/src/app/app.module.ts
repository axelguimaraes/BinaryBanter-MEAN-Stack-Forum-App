import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './login-dialog/dialog.component';
import { ThreadContainerComponent } from './thread-container/thread-container.component';
import { AddThreadDialogComponent } from './add-thread-dialog/add-thread-dialog.component';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ConfirmationDialogComponent } from './user-profile/confirmation-dialog/confirmation-dialog.component';
import { EditProfileDialogComponent } from './user-profile/edit-profile-dialog/edit-profile-dialog.component';
import { ChangePasswordDialogComponent } from './user-profile/change-password-dialog/change-password-dialog.component';
import { SearchTagsDialogComponent } from './search-tags-dialog/search-tags-dialog.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { EditThreadDialogComponent } from './edit-thread-dialog/edit-thread-dialog.component';
import { EditPostDialogComponent } from './edit-post-dialog/edit-post-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ThreadContainerComponent,
    AddThreadDialogComponent,
    ThreadDetailsComponent,
    AddPostDialogComponent,
    UserProfileComponent,
    ConfirmationDialogComponent,
    EditProfileDialogComponent,
    ChangePasswordDialogComponent,
    SearchTagsDialogComponent,
    SearchResultsComponent,
    EditThreadDialogComponent,
    EditPostDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    FontAwesomeModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
