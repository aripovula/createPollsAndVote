import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionItemComponent } from './option-item.component';

describe('OptionItemComponent', () => {
  let component: OptionItemComponent;
  let fixture: ComponentFixture<OptionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
