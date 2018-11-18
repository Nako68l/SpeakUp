import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  userEmail: string;

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  onEmailSignUp(e) {
    this.userEmail = e;
  }

  goToLogin() {
    this.userEmail = ''
  }
}
