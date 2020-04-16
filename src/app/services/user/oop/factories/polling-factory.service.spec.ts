import { TestBed } from '@angular/core/testing';

import { PollingFactoryService } from './polling-factory.service';

describe('PollingFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollingFactoryService = TestBed.get(PollingFactoryService);
    expect(service).toBeTruthy();
  });
});
