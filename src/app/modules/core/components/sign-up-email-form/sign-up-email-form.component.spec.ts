import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEmailFormComponent } from './sign-up-email-form.component';

describe('SignUpEmailFormComponent', () => {
  let component: SignUpEmailFormComponent;
  let fixture: ComponentFixture<SignUpEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
