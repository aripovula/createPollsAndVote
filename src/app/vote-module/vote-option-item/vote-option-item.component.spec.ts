import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteOptionItemComponent } from './vote-option-item.component';

describe('VoteOptionItemComponent', () => {
  let component: VoteOptionItemComponent;
  let fixture: ComponentFixture<VoteOptionItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteOptionItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteOptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
