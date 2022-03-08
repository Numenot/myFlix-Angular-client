import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-modal',
  templateUrl: './synopsis-modal.component.html',
  styleUrls: ['./synopsis-modal.component.scss']
})

//basic dialog inject with title and description of movie
export class SynopsisModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string },
    public dialogRef: MatDialogRef<SynopsisModalComponent>
  ) { }

  ngOnInit(): void { }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}