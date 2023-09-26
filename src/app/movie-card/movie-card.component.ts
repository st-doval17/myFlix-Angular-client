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
  favoritesMap: { [movieId: string]: boolean } = {};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.loadUserFavorites();
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
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const username = userObject.Username;
    const token = localStorage.getItem('token');

    console.log(username);
    console.log(movieId);

    console.log('Adding/Removing from favorites:', movieId);

    if (username && token) {
      if (this.favoritesMap[movieId]) {
        // If the movie is already in favorites, remove it
        this.deleteFavoriteMovie(username, movieId);
      } else {
        // If the movie is not in favorites, add it
        this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(
          (response) => {
            console.log('Successfully added to favorites:', response);
            this.favoritesMap[movieId] = true;
            this.snackBar.open('Movie added to favorites', 'OK', {
              duration: 2000,
            });
            this.saveUserFavorites();
          },
          (error) => {
            console.error('Failed to add movie to favorites:', error);
            this.snackBar.open('Failed to add movie to favorites', 'OK', {
              duration: 2000,
            });
          }
        );
      }
    } else {
      console.log('User data (username or token) is missing or undefined');
    }
  }

  loadUserFavorites(): void {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovies = userObject.FavoriteMovies || [];

    // Populate favoritesMap based on stored favorites
    favoriteMovies.forEach((movieId: string) => {
      this.favoritesMap[movieId] = true;
    });
  }

  // Save updated favorites to local storage
  saveUserFavorites(): void {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    userObject.FavoriteMovies = Object.keys(this.favoritesMap).filter(
      (movieId) => this.favoritesMap[movieId]
    );
    localStorage.setItem('user', JSON.stringify(userObject));
  }

  deleteFavoriteMovie(username: string, movieId: string): void {
    console.log('Deleting movie:', movieId, 'for user:', username);

    this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
      (response) => {
        console.log('Successfully removed from favorites:', response);
        // Update favoritesMap to remove the bookmark
        this.favoritesMap[movieId] = false;
        this.snackBar.open('Movie removed from favorites', 'OK', {
          duration: 2000,
        });
        // Save the updated favorites to local storage
        this.saveUserFavorites();
      },
      (error) => {
        console.error('Failed to remove movie from favorites:', error);
        this.snackBar.open('Failed to remove movie from favorites', 'OK', {
          duration: 2000,
        });
      }
    );
  }

  // Helper function to check if the movie is already in favorites
  isMovieInFavorites(movieId: string): boolean {
    const userObject = JSON.parse(localStorage.getItem('user') || '{}');
    const favoriteMovies = userObject.FavoriteMovies || [];

    return favoriteMovies.includes(movieId);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
