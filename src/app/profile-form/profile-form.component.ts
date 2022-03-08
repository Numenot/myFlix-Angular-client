import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = {
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday,
  };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  //get user details on init
  ngOnInit(): void {
    this.getUser();
  }

  //get current user details
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
    });
  }

  //edit user details and display green snackbar to confirm
  editUser(): void {
    this.fetchApiData.editUser(this.Username, this.userData).subscribe((resp) => {
      this.dialogRef.close();
      this.snackBar.open('Your profile was updated successfully!', 'x', {
        duration: 4000,
        panelClass: ['green-snackbar']
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}