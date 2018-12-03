import { TestBed } from '@angular/core/testing';

import { UniqueUsernameValidator } from './unique-username-validator.service';

describe('UniqueUsernameValidator', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueUsernameValidator = TestBed.get(UniqueUsernameValidator);
    expect(service).toBeTruthy();
  });
});
