import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SignUpEmailErrorStateMatcher } from '@helpers/sign-up-email-error-state-matcher/sign-up-email-error-state-matcher';
import { environment } from 'environments/environment';
import { MatFormFieldControl } from '@angular/material';


@Component({
  selector: 'app-sign-up-email-form',
  templateUrl: './sign-up-email-form.component.html',
  styleUrls: ['./sign-up-email-form.component.scss']
})
export class SignUpEmailFormComponent implements OnInit {
  emailForm: FormGroup;

  matcher = new SignUpEmailErrorStateMatcher();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.emailForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
      ]]
    })
  }

  sendEmailLink() {
    const actionCodeSettings = {
      url: environment.appUrl + '/account/settings'
    }
  }

  get email() {
    return this.emailForm.get('email') as FormControl;
  }
}
