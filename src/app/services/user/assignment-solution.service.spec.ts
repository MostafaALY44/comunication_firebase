import { TestBed } from '@angular/core/testing';

import { AssignmentSolutionService } from './assignment-solution.service';

describe('AssignmentSolutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignmentSolutionService = TestBed.get(AssignmentSolutionService);
    expect(service).toBeTruthy();
  });
});
