import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '@shared/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private $user: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.$user = this.getUserObservable();
    }


    private getUserObservable(): Observable<User> {
        const defaultUser = of(null);

        return this.afAuth.authState.pipe(
            switchMap(user =>
                user ?
                    this.getUserRef(user.uid).valueChanges() :
                    defaultUser
            )
        );
    }

    private getUserRef = (uid): AngularFirestoreDocument<User> => this.afs.doc<User>(`users/${ uid }`);

    async googleSignIn() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }

    private updateUserData({ uid, email, displayName, photoURL }: User) {
        const userRef = this.getUserRef(uid);

        const data = {
            uid,
            email,
            displayName,
            photoURL
        };

        return userRef.set(data, { merge: true });
    }
}
