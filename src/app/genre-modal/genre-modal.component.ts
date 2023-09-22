import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss'],
})
export class GenreModalComponent {
  genre: any;

  constructor(
    public dialogRef: MatDialogRef<GenreModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.genre = data.genre;
  }
}
