import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPollingComponent } from './edit-polling.component';

describe('EditPollingComponent', () => {
  let component: EditPollingComponent;
  let fixture: ComponentFixture<EditPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
