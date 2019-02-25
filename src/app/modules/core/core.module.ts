import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SignUpEmailFormComponent } from './components/sign-up-email-form/sign-up-email-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundPage } from './error-pages/not-found/not-found.page';

@NgModule({
  declarations: [
    SignUpEmailFormComponent,
    LoginModalComponent,
    NavBarComponent,
    NotFoundPage
  ],
  exports: [
    NavBarComponent,
    NotFoundPage
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  entryComponents: [
    LoginModalComponent
  ]
})
export class CoreModule {
}
