import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotedPersonsComponent } from './voted-persons.component';

describe('VotedPersonsComponent', () => {
  let component: VotedPersonsComponent;
  let fixture: ComponentFixture<VotedPersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotedPersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotedPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
