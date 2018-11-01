import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { MaterialElementsModule } from 'app/material-elements/material-elements.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpEmailFormComponent } from './login-modal/sign-up-email-form/sign-up-email-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    LoginModalComponent
  ],
  imports: [
    CommonModule,
    MaterialElementsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NavBarComponent,
    LoginModalComponent,
    SignUpEmailFormComponent,
  ],
  exports:[
    NavBarComponent
  ]
})
export class NavBarModule { }
