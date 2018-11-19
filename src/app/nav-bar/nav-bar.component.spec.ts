import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let debugElement: DebugElement;

  let afAuth: AngularFireAuth;
  let dialog: MatDialog;

  const angularFireAuthStub = {
    auth: {
      signOut: jasmine.createSpy('signOut').and.callFake(()=>angularFireAuthStub.authState.next(null))
    },
    authState: new BehaviorSubject({uid: 'ABC123'}) 
  }

  const matDialog = {
    open: jasmine.createSpy('open')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: MatDialog, useValue: matDialog}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
    afAuth = debugElement.injector.get(AngularFireAuth);
    dialog = debugElement.injector.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout from firebase', () => {
    let currentUser;
    angularFireAuthStub.authState.subscribe(user => currentUser = user);
    expect(currentUser).toBeTruthy();
    component.onLogout()
    expect(currentUser).toBeFalsy();  
    expect(afAuth.auth.signOut).toHaveBeenCalledTimes(1);
  })

  it('should open dialog', ()=> {
    component.onLogin()
    expect(dialog.open).toHaveBeenCalledTimes(1);
  })
});
