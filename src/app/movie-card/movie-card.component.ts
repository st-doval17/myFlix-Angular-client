import { Component, OnInit, Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreModalComponent } from '../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() userData: any;
  movies: any[] = [];

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openMovieDetailsDialog(movie: any): void {
    const dialogRef = this.dialog.open(MovieDetailsDialogComponent, {
      width: '800px',
      data: movie,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  openGenreModal(movie: any): void {
    const dialogRef = this.dialog.open(GenreModalComponent, {
      width: '600px',
      data: { genre: movie.Genre },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Genre modal closed');
    });
  }

  openDirectorModal(movie: any): void {
    const dialogRef = this.dialog.open(DirectorModalComponent, {
      width: '800px',
      data: { director: movie.Director },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Director modal closed');
    });
  }

  addToFavorites(movieId: string): void {
    // parse the stringified user object stored in localStorage to convert it to javasscript object
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');

    // store the username in the `username` variable
    const username = userObject.Username;

    const token = localStorage.getItem('token');

    console.log(username);
    console.log(movieId);

    console.log('Adding to favorites:', movieId);

    if (username && token) {
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
        (response) => {
          console.log('Successfully added to favorites:', response);
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Failed to add movie to favorites:', error);
          this.snackBar.open('Failed to add movie to favorites', 'OK', {
            duration: 2000,
          });
        }
      );
    } else {
      console.log('User data (username or token) is missing or undefined');
    }
  }

  deleteFavoriteMovie(movieId: string): void {
    // Get the user's username from localStorage
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const username = userObject.Username;

    if (username) {
      console.log('Deleting movie:', movieId, 'for user:', username);

      // Call the deleteFavoriteMovie API with the username and movieId
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
        (response) => {
          console.log('Successfully removed from favorites:', response);
          this.snackBar.open('Movie removed from favorites', 'OK', {
            duration: 2000,
          });

          // Optionally, you can update the local movies array to reflect the change in UI.
          // For example, you can remove the movie from this.movies.
          // this.movies = this.movies.filter((m) => m._id !== movieId);
        },
        (error) => {
          console.error('Failed to remove movie from favorites:', error);
          this.snackBar.open('Failed to remove movie from favorites', 'OK', {
            duration: 2000,
          });
        }
      );
    } else {
      console.log('User data (username) is missing or undefined');
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
