import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignUpEmailErrorStateMatcher } from '@helpers/sign-up-email-error-state-matcher/sign-up-email-error-state-matcher';
import { environment } from 'environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { emailRegEx } from '@helpers/helper-variables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-email-form',
  templateUrl: './sign-up-email-form.component.html',
  styleUrls: ['./sign-up-email-form.component.scss']
})
export class SignUpEmailFormComponent implements OnInit {
  emailSent: boolean = false;
  sendingEmail: boolean = false;
  emailForm: FormGroup;
  matcher = new SignUpEmailErrorStateMatcher();

  @Output() onSignUp = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(emailRegEx),
      ]]
    })
  }

  async sendEmailLink() {
    this.sendingEmail = true;

    const actionCodeSettings = {
      url: environment.appUrl + '#/account/settings',
      handleCodeInApp: true,
    }

    try {
      await this.afAuth.auth.sendSignInLinkToEmail(
        this.userEmail,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.userEmail);
      this.onSignUp.emit(this.userEmail);
      this.emailSent = true;
    } catch (err) {
      this.toastr.error(err.message, 'Error', {
        progressBar: true,
        timeOut: 6000
      })
    }
    this.sendingEmail = false;
  }

  get email() {
    return this.emailForm.get('email');
  }

  get userEmail(){
    return this.email.value;
  }
}
