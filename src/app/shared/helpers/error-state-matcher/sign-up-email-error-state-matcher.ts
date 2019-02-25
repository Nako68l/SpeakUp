import { ErrorStateMatcher } from '@angular/material';
import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';

export class SignUpEmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    console.log('control', control, control.touched);
    return !!(control && control.invalid && (control.touched || isSubmitted));
  }
}
