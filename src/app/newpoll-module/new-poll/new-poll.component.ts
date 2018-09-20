import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { NewPoll } from './../newpoll-model';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit = () => {
    const newPoll = new NewPoll(1, '', 1);
  }
}
