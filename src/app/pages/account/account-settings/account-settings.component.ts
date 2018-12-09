import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { accountValidationMessages } from './account.validation-messages';
import { StorageService } from '../../../services/storage.service';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { UsernameValidator } from '@validators/username.validator';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {

  instantlyAppearErrorsMatcher = new ShowOnDirtyErrorStateMatcher()
  validationMessages = accountValidationMessages;

  userDetailsForm: FormGroup;
  user: Observable<firebase.User>;
  uploadPercent;
  downloadURL;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private storage: StorageService,
    private usernameValidator: UsernameValidator
  ) { }

  ngOnInit() {
    this.declareUserDetailsForm();

    this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }

  declareUserDetailsForm(){
    this.userDetailsForm = this.fb.group({
      nickname: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_.]+'),
        Validators.maxLength(25)
      ], [
          this.usernameValidator.unique()
        ]]
    });
  }

  //TODO: move to service
  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem('emailForSignIn');

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem('emailForSignIn');
      }
    } catch (err) {
      this.toastr.error(err.message, 'Error');
    }
  }

  uploadImage($event) {
    [this.uploadPercent, this.downloadURL] = this.storage.upload('userPhoto', $event);
  }

  get nickname(): FormControl {
    return this.userDetailsForm.get('nickname') as FormControl;
  }
}
