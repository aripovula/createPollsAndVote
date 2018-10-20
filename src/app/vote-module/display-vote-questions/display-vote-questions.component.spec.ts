import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayVoteQuestionsComponent } from './display-vote-questions.component';

describe('DisplayVoteQuestionsComponent', () => {
  let component: DisplayVoteQuestionsComponent;
  let fixture: ComponentFixture<DisplayVoteQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayVoteQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayVoteQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
