import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { SignUpEmailFormComponent } from './sign-up-email-form.component';
import { ReactiveFormsModule, FormControl, AbstractControl } from '@angular/forms';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService, Toast, ActiveToast } from 'ngx-toastr';
import { environment } from 'environments/environment';

fdescribe('SignUpEmailFormComponent', () => {
  let fixture: ComponentFixture<SignUpEmailFormComponent>;
  let debugElement: DebugElement;
  let component: SignUpEmailFormComponent;
  let email: AbstractControl;

  let afAuth: AngularFireAuth;
  let toastr: ToastrService;

  const angularFireAuthStub = {
    auth: {
      sendSignInLinkToEmail: jasmine.createSpy('sendSignInLinkToEmail')
    }
  }
  const toastrServiceStub = {
    error: jasmine.createSpy('error')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpEmailFormComponent],
      providers: [
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: ToastrService, useValue: toastrServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmailFormComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    component.ngOnInit();
    email = component.email;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.emailForm.valid).toBeFalsy();
  });

  it('email invalid when empty', () => {
    expect(email.valid).toBeFalsy();
  })

  it('email invalid pattern', () => {
    email.setValue("test");
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('pattern')).toBeTruthy();
  })

  it('valid email', () => {
    email.setValue("test@example.com");
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('pattern')).toBeFalsy();
    expect(component.emailForm.valid).toBeTruthy();
  })

  it('sendEmailLink sending data', fakeAsync(() => {
    const userEmail = "test@example.com";
    let emailFromOutput;
    component.onSignUp.subscribe(email => emailFromOutput = email);

    afAuth = debugElement.injector.get(AngularFireAuth);

    email.setValue(userEmail);
    component.sendEmailLink()

    expect(component.sendingEmail).toBeTruthy();

    tick()

    expect(component.sendingEmail).toBeFalsy();
    expect(emailFromOutput).toBe(userEmail);

    expect(afAuth.auth.sendSignInLinkToEmail).toHaveBeenCalledTimes(1);
    expect(afAuth.auth.sendSignInLinkToEmail).toHaveBeenCalledWith(
      userEmail, {
        url: environment.appUrl + 'account/settings',
        handleCodeInApp: true
      });
    expect(component.emailSent).toBeTruthy();
  }))


  it('toastr show error', fakeAsync(() => {
    const userEmail = "test";
    let emailFromOutput;
    component.onSignUp.subscribe(email => emailFromOutput = email);

    angularFireAuthStub.auth.sendSignInLinkToEmail.and.throwError('No internet')
    afAuth = debugElement.injector.get(AngularFireAuth);
    toastr = debugElement.injector.get(ToastrService);


    email.setValue(userEmail);
    component.sendEmailLink()

    expect(component.sendingEmail).toBeFalsy();

    expect(emailFromOutput).toBe(undefined);

    expect(toastr.error).toHaveBeenCalledTimes(1);
    expect(toastr.error).toHaveBeenCalledWith('No internet', 'Error');

    expect(component.emailSent).toBeFalsy();
  }))
});
