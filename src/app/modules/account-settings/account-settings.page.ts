import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';
import * as firebase from 'firebase';
import { UserValidator } from '@validators/user-validator.service';
import { FileStorageService } from '@services/file-storage/file-storage.service';
import { accountValidationMessages } from '@hard-data/validation-messages/account.validation-messages';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.page.html',
    styleUrls: ['./account-settings.page.scss'],
    providers: [FileStorageService]
})
export class AccountSettingsPage implements OnInit {

    instantlyAppearErrorsMatcher = new ShowOnDirtyErrorStateMatcher();
    validationMessages = accountValidationMessages;

    userDetailsForm: FormGroup;
    user: Observable<firebase.User>;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private toastr: ToastrService,
        private fb: FormBuilder,
        private userValidator: UserValidator,
    ) {
    }

    ngOnInit() {
        this.declareUserDetailsForm();

        this.user = this.afAuth.authState;

        const url = this.router.url;

        this.confirmSignIn(url);
    }

    declareUserDetailsForm() {
        this.userDetailsForm = this.fb.group({
            nickname: ['', [
                Validators.required,
                Validators.pattern('[a-zA-Z0-9_.]+'),
                Validators.maxLength(25)
            ], [
                this.userValidator.uniqueUsername()
            ]]
        });
    }

    // TODO: move to service
    async confirmSignIn(url) {
        try {
            if (this.afAuth.auth.isSignInWithEmailLink(url)) {
                let email = window.localStorage.getItem('emailForSignIn');

                // If missing email, prompt user for it
                if (!email) {
                    email = window.prompt('Please provide your email for confirmation');
                }

                // Signin user and remove the email localStorage
                await this.afAuth.auth.signInWithEmailLink(email, url);
                window.localStorage.removeItem('emailForSignIn');
            }
        } catch (err) {
            this.toastr.error(err.message, 'Error');
        }
    }

    get nickname(): FormControl {
        return this.userDetailsForm.get('nickname') as FormControl;
    }
}
