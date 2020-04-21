import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesBodyComponent } from './courses-body.component';

describe('CoursesBodyComponent', () => {
  let component: CoursesBodyComponent;
  let fixture: ComponentFixture<CoursesBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
