import { Component, OnInit } from '@angular/core';
import { UserRegistrationService, User } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { DeleteUserFormComponent } from '../delete-user-form/delete-user-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  FavoriteMovies: any[] = [];

  constructor(public fetchApiData: UserRegistrationService, public snackBar: MatSnackBar, public dialog: MatDialog, public router: Router
  ) { }

  /** 
   * Get user details and current user favorite movies on init
   */
  ngOnInit(): void {
    this.getFavoriteMovies();
    this.getUser();
  }

  /**
   * Get user details
   * @function getUser
   * @param user
   * @returns User data in json format
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: User) => {
        console.log(resp);
        this.user = resp;
      });
    }
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
      return this.FavoriteMovies;
    });
  }

  /**
   * remove movie from favoirte list
   * @function deleteFavorites
   * @param MovieId {string}
   * @returns User details in json format via ngOnInit function
   */
  removeFavoriteMovie(MovieId: string): void {
    this.fetchApiData.deleteFavorites(MovieId).subscribe((resp: any) => {
      this.snackBar.open(
        'This movie was removed from your favorites!',
        'x',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
  }

  /**
   * function to open the profile form dialog to  edit user details
   * @module ProfileFormComponent
   */
  openProfileFormDialog(): void {
    this.dialog.open(ProfileFormComponent, {
      width: '350px'
    });
  }

  /**
   * function to open the delete profile dialog
   * @module DeleteUserFormComponent
   */
  openDeleteUserFormDialog(): void {
    this.dialog.open(DeleteUserFormComponent, {
      width: '350px'
    })
  }

}
