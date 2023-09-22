import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreModalComponent } from './genre-modal/genre-modal.component';
import { DirectorModalComponent } from './director-modal/director-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

const routes: Routes = [
  { path: 'genre/:genreName', component: GenreModalComponent },
  { path: 'director/:directorName', component: DirectorModalComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'movies', component: MovieCardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
