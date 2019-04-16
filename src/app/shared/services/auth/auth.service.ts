import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '@shared/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { environment } from '../../../../environments/environment';
import { FirestoreDataService } from '@services/firestore/firestore-data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    $user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private firestoreData: FirestoreDataService
    ) {
        this.$user = this.getUserObservable();
    }


    private getUserObservable(): Observable<User> {
        const defaultUser = of(null);

        return this.afAuth.authState.pipe(
            switchMap(user =>
                user ?
                    this.firestoreData.user(user.uid).valueChanges() :
                    defaultUser
            )
        );
    }

    async googleSignIn() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async passwordlessSignIn(userEmail) {
        const actionCodeSettings = {
            url: environment.appUrl + 'account/settings',
            handleCodeInApp: true,
        };

        await this.afAuth.auth.sendSignInLinkToEmail(
            userEmail,
            actionCodeSettings
        );
        window.localStorage.setItem('emailForSignIn', userEmail);
    }

    private updateUserData({ uid, email, displayName, photoURL }: User) {
        const userRef = this.firestoreData.user(uid);

        const data = {
            uid,
            email,
            displayName,
            photoURL
        };


        return userRef.set(data, { merge: true });
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }
}
