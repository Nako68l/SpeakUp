import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpEmailErrorStateMatcher } from '@helpers/error-state-matcher/sign-up-email-error-state-matcher';
import { emailRegEx } from '@helpers/helper-variables';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@services/auth/auth.service';

@Component({
    selector: 'app-sign-up-email-form',
    templateUrl: './sign-up-email-form.component.html',
    styleUrls: ['./sign-up-email-form.component.scss']
})
export class SignUpEmailFormComponent implements OnInit {
    emailSent = false;
    sendingEmail = false;
    emailForm: FormGroup;
    matcher = new SignUpEmailErrorStateMatcher();

    @Output() signUp = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.emailForm = this.fb.group({
            email: ['', [
                Validators.required,
                Validators.pattern(emailRegEx),
            ]]
        });
    }

    async sendEmailLink() {
        this.sendingEmail = true;
        this.auth.passwordlessSignIn(this.userEmail)
            .then(this.onEmailSuccess)
            .catch(this.onEmailError)
            .finally(() => this.sendingEmail = false);
    }

    private onEmailSuccess = () => {
        this.signUp.emit(this.userEmail);
        this.emailSent = true;
    }

    private onEmailError = err => {
        this.toastr.error(err.message, 'Error');
    }

    get email() {
        return this.emailForm.get('email');
    }

    get userEmail() {
        return this.email.value;
    }
}
