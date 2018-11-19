import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { StorageService } from 'app/services/storage/storage.service';

fdescribe('AccountSettingsComponent', () => {
  const USER_OBJECT: firebase.User = { uid: 'ABC123' } as firebase.User
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;
  let debugElement: DebugElement;
  let afAuth: AngularFireAuth;
  let toastr: ToastrService;
  let router: Router;
  let storage: StorageService;

  const userEmail = 'test@example.com'

  const angularFireAuthStub = {
    auth: {
      isSignInWithEmailLink: jasmine.createSpy('isSignInWithEmailLink').and.returnValue(true),
      signInWithEmailLink: jasmine.createSpy('signInWithEmailLink').and.returnValue(Promise.resolve(true))
    },
    authState: new BehaviorSubject(USER_OBJECT)
  }
  const toastrServiceStub = {
    error: jasmine.createSpy('error')
  }
  const routerStub = {
    url: 'test.com'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
    })
      .overrideComponent(AccountSettingsComponent, {
        set: {
          providers: [
            { provide: AngularFireAuth, useValue: angularFireAuthStub },
            { provide: ToastrService, useValue: toastrServiceStub },
            { provide: Router, useValue: routerStub },
            StorageService
          ]
        }
      })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    afAuth = debugElement.injector.get(AngularFireAuth);
    toastr = debugElement.injector.get(ToastrService);
    router = debugElement.injector.get(Router);
    storage = TestBed.get(StorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should confirm Sign In', fakeAsync(() => {
    storage.set(component.emailStorageKey, userEmail)
    spyOn(window, 'prompt').and.returnValue(userEmail)
    spyOn(window, 'confirm')

    fixture.detectChanges();

    expect(afAuth.auth.isSignInWithEmailLink).toHaveBeenCalledTimes(1)
    expect(afAuth.auth.isSignInWithEmailLink).toHaveBeenCalledWith(routerStub.url);
    expect(afAuth.auth.signInWithEmailLink).toHaveBeenCalledTimes(1)
    expect(afAuth.auth.signInWithEmailLink).toHaveBeenCalledWith(userEmail, routerStub.url);
  }))
});
