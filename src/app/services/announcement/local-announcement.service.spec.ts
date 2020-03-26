import { TestBed } from '@angular/core/testing';

import { LocalAnnouncementService } from './local-announcement.service';

describe('LocalAnnouncementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalAnnouncementService = TestBed.get(LocalAnnouncementService);
    expect(service).toBeTruthy();
  });
});
