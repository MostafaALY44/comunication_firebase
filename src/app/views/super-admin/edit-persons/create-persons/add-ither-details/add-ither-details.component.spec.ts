import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItherDetailsComponent } from './add-ither-details.component';

describe('AddItherDetailsComponent', () => {
  let component: AddItherDetailsComponent;
  let fixture: ComponentFixture<AddItherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
