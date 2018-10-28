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

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MaterialElementsModule } from './material-elements/material-elements.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModalComponent } from './nav-bar/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginModalComponent,
  ],
  entryComponents: [
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'speak-up'),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialElementsModule,

    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
