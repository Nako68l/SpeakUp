import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialElementsModule } from '../../shared/material-elements/material-elements.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../../shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SignUpEmailFormComponent } from './components/sign-up-email-form/sign-up-email-form.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RouterModule } from '@angular/router';

// fontawesome config
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
library.add(faFacebook, faGoogle);
//

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, 'speak-up'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        MaterialElementsModule,
        FontAwesomeModule,
        ToastrModule.forRoot({
            progressBar: true,
            timeOut: 6000
        }),
        AdminModule,
        UserModule,
        SharedModule,
    ],
    declarations: [
        NotFoundPage,
        SignUpEmailFormComponent,
        LoginModalComponent,
        NavBarComponent
    ],
    exports: [
        NavBarComponent,
        RouterModule
    ],
    entryComponents: [
        LoginModalComponent
    ]
})
export class CoreModule {
}
