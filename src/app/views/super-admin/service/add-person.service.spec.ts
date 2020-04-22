import { TestBed } from '@angular/core/testing';

import { AddPersonService } from './add-person.service';

describe('AddPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddPersonService = TestBed.get(AddPersonService);
    expect(service).toBeTruthy();
  });
});
