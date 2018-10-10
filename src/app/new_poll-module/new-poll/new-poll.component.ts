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
  expiresDateTime = '';
  changeDate = true;
  // id, name, questionsQnty, publicAccess, nameDiscloseOption, createdBy,
  // createdTimeStamp, expiresAt, comment
  model = new NewPoll(null, null, null, 'public', 'anonymous', null, moment().valueOf(), 0, '', 'withusernames', null);

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    console.log('poll_id = ', this.poll_id);
    if (this.poll_id != null) {
      this.store.select('polls').subscribe(
        data => {
          if (data != null && data.polls != null) {
            const data2 = data.polls.filter(({ id }) => id === this.poll_id);
            this.model = data2[0];
            console.log('model = ', this.model);
            const date: string = moment(this.model.expiresTimeStamp).format('MMM DD, YYYY, HH:MM A').toString();
            console.log('date = ', date);
            console.log('date type = ', typeof date);
            this.expiresDateTime = date;
            this.changeDate = false;
          }
        });
    }
  }

  onChangeDateClicked() {
    this.changeDate = true;
  }

  onSubmit() {
    let uid;
    if (this.poll_id == null) {
      uid = UUID.UUID();
      this.model.id = uid;
    } else {
      uid = this.model.id;
    }
    this.model.expiresTimeStamp = moment(this.expiresDateTime).valueOf() * 1;
    console.log('model.expires = ', this.model.expiresTimeStamp);

    this.firebaseService.saveNewPollToDB(this.model, uid);
    this.store.dispatch(new PollsActions.UpdatePoll(this.model, this.poll_id));

    // this.store.select('polls').subscribe(
    //   data => {
    //     console.log('data 2 = ', data);
    //     const polls2 = data.polls[0];
    //     console.log('data 2a = ', polls2);
    //   });

    this.router.navigate(['/questions', this.model.questionsQnty, uid]);
  }
}
