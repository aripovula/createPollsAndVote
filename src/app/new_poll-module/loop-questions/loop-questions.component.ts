import { Component, OnInit, Input } from '@angular/core';

import { NewPoll } from './../models/new_poll-model';

@Component({
  selector: 'app-loop-questions',
  templateUrl: './loop-questions.component.html',
  styleUrls: ['./loop-questions.component.css']
})
export class LoopQuestionsComponent implements OnInit {
  @Input('model') model: NewPoll;
  constructor() { }

  ngOnInit() {
  }

}
