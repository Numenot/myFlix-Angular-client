import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss']
})

//basic dialog inject with name and description of genre
export class GenreModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string; description: string },
    public dialogRef: MatDialogRef<GenreModalComponent>
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