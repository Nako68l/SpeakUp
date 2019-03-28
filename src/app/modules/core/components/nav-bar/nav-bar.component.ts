import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth/auth.service';
import { User } from '@shared/models/user';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    user: Observable<User>;

    constructor(
        public dialog: MatDialog,
        private afAuth: AngularFireAuth,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        this.user = this.auth.$user;
    }

    onLogin() {
        this.dialog.open(LoginModalComponent, { width: '265px', height: '260px', autoFocus: false });
    }

    onLogout() {
        this.auth.signOut();
    }
}
