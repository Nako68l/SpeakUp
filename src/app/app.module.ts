import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'environments/environment';

import { MaterialElementsModule } from './material-elements/material-elements.module';

import { HomeModule } from './pages/home/home.module';

//fontawesome config
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faGoogle);
//
import { HelpersModule } from './helpers/helpers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'speak-up'),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialElementsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    HelpersModule,

    HomeModule,

    NavBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
