// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result: any) => {
        console.log(
          'User registration successful:',
          JSON.stringify(this.userData)
        );

        this.snackBar.open(result.message, 'Success', {
          duration: 2000,
        });
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('User registration error:', error);
        this.snackBar.open(error, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
