import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { FirebaseService } from './../../firebase.service';
import { NewPoll } from './../models/new_poll-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as authState from '../../ngrx-store/auth-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';
import * as AuthActions from './../../ngrx-store/auth-action';



@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})
export class NewPollComponent implements OnInit {
  poll_id = null;
  dateF = moment().toString();
  // id, name, questionsQnty, expiresOn, expiresMidnight, publicAccess, nameDiscloseOption, createdBy,
  // createdTimeStamp, expiresAt, comment
  model = new NewPoll(null, null, null, null, true, 'public', 'anonymous', null, this.dateF, '', '');

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    console.log('poll_id = ', this.poll_id);
    if (this.poll_id != null) {
      this.store.select('polls').subscribe(
        data => {
          const data2 = data.polls.filter(({ id }) => id === this.poll_id);
          this.model = data2[0];
          console.log('model = ', this.model);
        });
    }
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
    const uid = UUID.UUID();
    this.model.id = uid;
    this.firebaseService.saveNewPollToDB(this.model, uid);
    this.router.navigate(['/questions', this.model.questionsQnty, uid ]);
  }
}
