import { TestBed } from '@angular/core/testing';

import { GlobalAnnouncementService } from './global-announcement.service';

describe('GlobalAnnouncementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalAnnouncementService = TestBed.get(GlobalAnnouncementService);
    expect(service).toBeTruthy();
  });
});
