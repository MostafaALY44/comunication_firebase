import { TestBed } from '@angular/core/testing';

import { PostFactoryService } from './post-factory.service';

describe('PostFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostFactoryService = TestBed.get(PostFactoryService);
    expect(service).toBeTruthy();
  });
});
