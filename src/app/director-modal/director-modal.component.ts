import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss'],
})
export class DirectorModalComponent {
  director: any;

  constructor(
    public dialogRef: MatDialogRef<DirectorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.director = data.director;
  }
  closeModal(): void {
    this.dialogRef.close();
  }
}
