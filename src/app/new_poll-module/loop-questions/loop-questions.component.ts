import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NewPoll } from './../models/new_poll-model';


@Component({
  selector: 'app-loop-questions',
  templateUrl: './loop-questions.component.html',
  styleUrls: ['./loop-questions.component.css']
})
export class LoopQuestionsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // const qnty = this.route.snapshot.queryParams['qnty'];
    const qnty = this.route.snapshot.paramMap.get('qnty');
    console.log('qnty = ', qnty);
}

  ngOnDestroy() {
  }

}
