import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginModalComponent } from './login-modal.component';
import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { MatDialogRef } from '@angular/material';

fdescribe('LoginModalComponent', () => {
  let component: LoginModalComponent;
  let fixture: ComponentFixture<LoginModalComponent>;
  let debugElement: DebugElement;
  let element;
  const userEmail = "test@example.com"

  const matDialogRefStub = {
    close: jasmine.createSpy('close')
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefStub }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginModalComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close modal', () => {
    const matDialogRef = debugElement.injector.get(MatDialogRef);
    component.onClose();
    expect(matDialogRef.close).toHaveBeenCalledTimes(1)
  })

  it('should render email', async(() => {
    component.onEmailSignUp(userEmail);

    fixture.detectChanges()

    fixture.whenStable().then(() => {
      expect(element.querySelector('.email-sent__info-block').querySelector('code').innerText).toBe(userEmail)
    })
  }))

  it('clear email on go to login', ()=>{
    component.userEmail = userEmail
    component.goToLogin();
    expect(component.userEmail.length).toBeLessThan(1)
  })
});
