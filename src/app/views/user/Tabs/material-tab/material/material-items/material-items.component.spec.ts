import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialItemsComponent } from './material-items.component';

describe('MaterialItemsComponent', () => {
  let component: MaterialItemsComponent;
  let fixture: ComponentFixture<MaterialItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
