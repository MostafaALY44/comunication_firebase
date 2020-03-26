import { TestBed, async, inject } from '@angular/core/testing';

import { InverseAuthGuard } from './inverse-auth.guard';

describe('InverseAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InverseAuthGuard]
    });
  });

  it('should ...', inject([InverseAuthGuard], (guard: InverseAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
