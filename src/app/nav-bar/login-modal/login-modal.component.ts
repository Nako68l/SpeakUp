import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
  }

  sendEmailLink(){
    const actionCodeSettings = {
      url: environment.appUrl + '/account/settings'
    }
  }

  onClose(){
    this.dialogRef.close();
  }

}
