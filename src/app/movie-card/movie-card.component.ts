import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreModalComponent } from '../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { SynopsisModalComponent } from '../synopsis-modal/synopsis-modal.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any = [];
  FavoriteMovies: any[] = [];
  user: any[] = [];
  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  //call for full movie list and favorite movies of current user upon page load
  ngOnInit(): void {
    this.getAllMovies();
    this.getFavoriteMovies();
  }

  /**
   * get all movies
   * @function getAllMovies
   * @returns list of movies in json format
   */
  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * get current user's favorite movie list
   * @function getUser
   * @param user
   * @returns array of user's favorite movies in json format
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavoriteMovies = resp.FavoriteMovies;
      console.log(this.FavoriteMovies);
    });
  }

  /**
   * add a favorite movie for current user
   * @function addFavorites
   * @param MovieID {string}
   * @param title {string}
   * @returns array of user's favorite movies in json format and display green snackbar to confirm
   */
  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavorites(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`"${title}" has been added to your favorites!`, 'x', {
        duration: 4000,
        panelClass: ['green-snackbar']
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * remove a favorite movie from current user
   * @function deleteFavorites
   * @param MovieId {string}
   * @param title {string}
   * @returns array of user's favorite movies in json format and display dark snackbar to confirm
   */
  removeFavoriteMovie(MovieId: string, title: string): void {
    this.fetchApiData.deleteFavorites(MovieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `"${title}" has been removed from your favorites!`,
        'x',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * check if movie is already in favorite list (this will change the displayed icon)
   * @param MovieID {string}
   * @returns boolean value
   */
  isFavorite(MovieID: string): boolean {
    return this.FavoriteMovies.some((movie) => movie._id === MovieID);
  }

  /**
   * check if movie is favorite and either remove or add it to favorite list depending on current state
   * if movie not in FavoriteMovies:
   * @function addFavoriteMovie
   * if movie in FavoriteMovies:
   * @function removeFavoriteMovie
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }

  /**
   *open the dialog with the genre of the movie selected
   * @function open
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreModalComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  /**
   *open the dialog with the director of the movie selected
   * @function open
   * @param name {string}
   * @param bio {string}
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorModalComponent, {
      data: { name: name, bio: bio },
      width: '300px',
    });
  }

  /**
   *open the dialog with the synopsis of the movie selected
   * @function open
   * @param title {string}
   * @param description {string}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisModalComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
}