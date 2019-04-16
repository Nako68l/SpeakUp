import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { FirestoreDataService } from '@services/firestore/firestore-data.service';

@Injectable({
    providedIn: 'root'
})
export class UsernameValidator {

    constructor(
        private firestoreData: FirestoreDataService
    ) {
    }

    unique() {
        return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
            const username = ctrl.value.toLowerCase();

            return this.firestoreData.username(username)
                .valueChanges()
                .pipe(
                    debounceTime(500),
                    take(1),
                    map(this.nicknameIsTaken)
                );
        };
    }

    private nicknameIsTaken = doc => {
        return doc ? { nicknameIsTaken: true } : null;
    }
}
