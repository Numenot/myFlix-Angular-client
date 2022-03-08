import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    private router: Router,
    public dialogRef: MatDialogRef<ProfileFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  //get user details on init
  ngOnInit(): void {
  }

  //edit user details and display green snackbar to confirm
  editUser(): void {
    this.fetchApiData.editUser(this.Username, this.userData).subscribe((resp) => {
      console.log(resp);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('Your user details were updated successfully! Please login again', 'x', {
        duration: 2000,
        panelClass: ['green-snackbar']
      });
      this.router.navigate(['welcome']);
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}