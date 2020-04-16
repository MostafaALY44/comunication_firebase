import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPollingComponent } from './add-polling.component';

describe('AddPollingComponent', () => {
  let component: AddPollingComponent;
  let fixture: ComponentFixture<AddPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
