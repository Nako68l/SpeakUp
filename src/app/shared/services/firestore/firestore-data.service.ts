import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryFn } from '@angular/fire/firestore';
import { User } from '@shared/models/user';

@Injectable({
    providedIn: 'root'
})
export class FirestoreDataService {
    constructor(
        private afs: AngularFirestore
    ) {
    }

    usernames = (queryFn?: QueryFn) => this.afs.collection(`usernames`, queryFn);
    username = (username: User['username']) => this.afs.doc(`usernames/${ username }`);

    user = (uid): AngularFirestoreDocument<User> => this.afs.doc<User>(`users/${ uid }`);

    private collection = <T>(name: string, queryFn?: QueryFn): AngularFirestoreCollection<T> => this.afs.collection(name, queryFn);
}
