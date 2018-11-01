import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignUpEmailErrorStateMatcher } from '@helpers/sign-up-email-error-state-matcher/sign-up-email-error-state-matcher';
import { environment } from 'environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { emailRegEx } from '@helpers/helper-variables';


@Component({
  selector: 'app-sign-up-email-form',
  templateUrl: './sign-up-email-form.component.html',
  styleUrls: ['./sign-up-email-form.component.scss']
})
export class SignUpEmailFormComponent implements OnInit {
  //TODO: make email sent and sending 2 way inputs or just outputs, make login modal spiner and email sent page
  emailForm: FormGroup;
  emailSent: boolean = false;
  sendingEmail: boolean = false;
  matcher = new SignUpEmailErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
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
        this.email.value,
        actionCodeSettings
      );
      window.localStorage.setItem('emailForSignIn', this.email.value);
      this.emailSent = true;
    } catch (err) {
      console.log(err.message, err)
      // this.errorMessage = err.message;
    }
    this.sendingEmail = false;
  }

  get email() {
    return this.emailForm.get('email');
  }
}
