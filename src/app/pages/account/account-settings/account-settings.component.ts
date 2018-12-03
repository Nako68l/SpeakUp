import { Component, OnInit } from "@angular/core";
import { FirebaseAuth } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { UniqueUsernameValidator } from "@validators/unique-username-validator.service";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.scss"]
})
export class AccountSettingsComponent implements OnInit {
  userDetailsForm: FormGroup;
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private uniqueUsernameValidator: UniqueUsernameValidator
  ) {}

  ngOnInit() {
    this.userDetailsForm = this.fb.group({
      nickname: [   "", [
          Validators.required
        ],[
          this.uniqueUsernameValidator
        ]
      ]
    });

    this.user = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }

  //TODO: move to service
  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = window.localStorage.getItem("emailForSignIn");

        // If missing email, prompt user for it
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        }

        // Signin user and remove the email localStorage
        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        window.localStorage.removeItem("emailForSignIn");
      }
    } catch (err) {
      this.toastr.error(err.message, "Error");
    }
  }

  get nickname(): FormControl {
    return this.userDetailsForm.get("nickname") as FormControl;
  }

  get nicknameIsEmpty() {
    return this.nickname.hasError("required");
  }

  get nicknameIsTaken() {
    return this.nickname.hasError('nicknameAvailable');
  }
}
