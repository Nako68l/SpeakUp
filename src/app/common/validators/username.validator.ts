import { AngularFirestore } from "@angular/fire/firestore";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UsernameValidator {

  constructor(
    private afs: AngularFirestore
  ) { }

  unique() {
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const nickname = ctrl.value.toLowerCase();

      return this.afs
        .collection("users", ref => ref.where("nickname", "==", nickname))
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map(arr => {
            return arr.length ? { nicknameIsTaken: true } : null;
          })
        );
    }
  }
}
