import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onLogin(){
    this.dialog.open(LoginModalComponent)
  }
}
