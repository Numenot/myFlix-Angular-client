import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})

//basic dialog inject with name and bio of director
export class DirectorModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; bio: string },
    public dialogRef: MatDialogRef<DirectorModalComponent>
  ) { }

  ngOnInit(): void { }

  /**
   * cancel function to close dialog
   * @function close
   */
  cancel(): void {
    this.dialogRef.close();
  }
}