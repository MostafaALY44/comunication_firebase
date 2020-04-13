import { TestBed } from '@angular/core/testing';

import { CourseFirebaseService } from './course-firebase.service';

describe('CourseFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseFirebaseService = TestBed.get(CourseFirebaseService);
    expect(service).toBeTruthy();
  });
});
