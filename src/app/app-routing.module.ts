import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenreModalComponent } from './genre-modal/genre-modal.component';
import { DirectorModalComponent } from './director-modal/director-modal.component';

const routes: Routes = [
  { path: 'genre/:genreName', component: GenreModalComponent },
  { path: 'director/:directorName', component: DirectorModalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
