import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollingItemsComponent } from './polling-items.component';

describe('PollingItemsComponent', () => {
  let component: PollingItemsComponent;
  let fixture: ComponentFixture<PollingItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollingItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollingItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
