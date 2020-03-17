import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentItemsComponent } from './assignment-items.component';

describe('AssignmentItemsComponent', () => {
  let component: AssignmentItemsComponent;
  let fixture: ComponentFixture<AssignmentItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
