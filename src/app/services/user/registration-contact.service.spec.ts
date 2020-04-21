import { TestBed } from '@angular/core/testing';

import { RegistrationContactService } from './registration-contact.service';

describe('RegistrationContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegistrationContactService = TestBed.get(RegistrationContactService);
    expect(service).toBeTruthy();
  });
});
