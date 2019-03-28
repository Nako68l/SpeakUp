import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
    userEmail: string;

    constructor(
        public dialogRef: MatDialogRef<LoginModalComponent>,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
    }

    onClose() {
        this.dialogRef.close();
    }

    onEmailSignUp(e) {
        this.userEmail = e;
    }

    goToLogin() {
        this.userEmail = '';
    }

    signUpGoogle() {
        this.auth.googleSignIn();
    }
}
