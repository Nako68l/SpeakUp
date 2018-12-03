import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AsyncValidator,
  AbstractControl,
  ValidationErrors
} from "@angular/forms";
import { Observable } from "rxjs";
import { debounceTime, take, map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private afs: AngularFirestore) {}

  validate(ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const nickname = ctrl.value.toLowerCase();

    return this.afs
      .collection("users", ref => ref.where("nickname", "==", nickname))
      .valueChanges()
      .pipe(
        debounceTime(500),
        take(1),
        map(arr => {
          console.log(arr);
          return arr.length ? { nicknameAvailable: true } : null;
        })
      );
  }
}
