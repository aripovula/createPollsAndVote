import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoopQuestionsComponent } from './loop-questions.component';

describe('LoopQuestionsComponent', () => {
  let component: LoopQuestionsComponent;
  let fixture: ComponentFixture<LoopQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoopQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
