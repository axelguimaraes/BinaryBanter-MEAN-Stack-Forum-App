import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';
import { ThreadContainerComponent } from './thread-container/thread-container.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { path: '', component: ThreadContainerComponent },
  { path: 'thread/:id', component: ThreadDetailsComponent },
  { path: 'user/:id', component: UserProfileComponent },
  {path: 'searchResults', component: SearchResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
