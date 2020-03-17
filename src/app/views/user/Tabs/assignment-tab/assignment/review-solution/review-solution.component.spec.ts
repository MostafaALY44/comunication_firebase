import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewSolutionComponent } from './review-solution.component';

describe('ReviewSolutionComponent', () => {
  let component: ReviewSolutionComponent;
  let fixture: ComponentFixture<ReviewSolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
