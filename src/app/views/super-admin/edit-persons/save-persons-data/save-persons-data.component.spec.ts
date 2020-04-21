import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePersonsDataComponent } from './save-persons-data.component';

describe('SavePersonsDataComponent', () => {
  let component: SavePersonsDataComponent;
  let fixture: ComponentFixture<SavePersonsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePersonsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePersonsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
