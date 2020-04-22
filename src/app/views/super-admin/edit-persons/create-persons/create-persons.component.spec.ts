import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePersonsComponent } from './create-persons.component';

describe('CreatePersonsComponent', () => {
  let component: CreatePersonsComponent;
  let fixture: ComponentFixture<CreatePersonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePersonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
