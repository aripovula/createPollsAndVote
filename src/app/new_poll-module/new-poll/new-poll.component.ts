import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { NewPoll } from './../models/new_poll-model';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {

  dateF = moment().toString();
  // id, name, questionsQnty, expiresOn, expiresMidnight, publicAccess, nameDiscloseOption, createdBy,
  // createdTimeStamp, expiresAt, comment
  model = new NewPoll(1, null, null, null, true, 'public', 'anonymous', null, this.dateF);

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('date=' + this.dateF);
  }

  expiresMidnightT() {
    this.model.expiresMidnight = true;
    console.log(this.model.expiresMidnight);
  }

  expiresMidnightF() {
    this.model.expiresMidnight = false;
    console.log(this.model.expiresMidnight);
  }

  onSubmit() {
    console.log('in onSubmit');
    console.log(this.model);
    this.router.navigate(['/questions']);
    // const newPoll = new NewPoll(1, '', 1);
  }
}
