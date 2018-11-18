import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user: Observable<firebase.User>

  constructor(public dialog: MatDialog,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.user = this.afAuth.authState;
  }

  onLogin() {
    this.dialog.open(LoginModalComponent, { width: '265px', height: '260px', autoFocus: false })
  }

  onLogout() {
    this.afAuth.auth.signOut();
  }
}
