import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'app/services/storage/storage.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
  user$: Observable<firebase.User>
  emailStorageKey: string = 'emailForSignIn'

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService,
    private storage: StorageService,
  ) { }

  ngOnInit() {
    this.user$ = this.afAuth.authState;

    const url = this.router.url;

    this.confirmSignIn(url);
  }

  async confirmSignIn(url) {
    try {
      if (this.afAuth.auth.isSignInWithEmailLink(url)) {
        let email = this.storage.get(this.emailStorageKey);

        if (!email) {
          email = window.prompt('Please provide your email for confirmation');
        }

        const result = await this.afAuth.auth.signInWithEmailLink(email, url);
        this.storage.remove(this.emailStorageKey);
      }
    } catch (err) {
      this.toastr.error(err.message, 'Error')
    }
  }

}
