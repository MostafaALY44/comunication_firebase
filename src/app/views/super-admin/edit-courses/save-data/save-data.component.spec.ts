import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDataComponent } from './save-data.component';

describe('SaveDataComponent', () => {
  let component: SaveDataComponent;
  let fixture: ComponentFixture<SaveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
