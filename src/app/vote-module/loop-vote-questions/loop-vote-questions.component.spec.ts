import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopVoteQuestionsComponent } from './loop-vote-questions.component';

describe('LoopVoteQuestionsComponent', () => {
  let component: LoopVoteQuestionsComponent;
  let fixture: ComponentFixture<LoopVoteQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopVoteQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopVoteQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
