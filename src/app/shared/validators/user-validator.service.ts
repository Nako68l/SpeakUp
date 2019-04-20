import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirestoreDataService } from '@services/firestore/firestore-data.service';

@Injectable({
    providedIn: 'root'
})
export class UserValidator {

    constructor(
        private firestoreData: FirestoreDataService
    ) {
    }

    uniqueUsername() {
        return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            return timer(500).pipe(switchMap(() => {
                    const username = ctrl.value.toLowerCase();

                    return this.firestoreData.username(username)
                        .valueChanges()
                        .pipe(
                            take(1),
                            map(this.nicknameIsTaken)
                        );
                }
            ));
        };
    }

    private nicknameIsTaken = doc => {
        return doc ? { nicknameIsTaken: true } : null;
    }
}
