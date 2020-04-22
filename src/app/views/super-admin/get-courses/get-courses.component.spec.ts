import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCoursesComponent } from './get-courses.component';

describe('GetCoursesComponent', () => {
  let component: GetCoursesComponent;
  let fixture: ComponentFixture<GetCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
