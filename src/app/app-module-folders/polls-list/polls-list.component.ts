import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as authState from '../../ngrx-store/auth-reducer';
import * as AuthActions from './../../ngrx-store/auth-action';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';


@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  polls: Array<NewPoll>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const that = this;

    this.polls = [];
    firebase.database().ref('/polls/').orderByChild('createdTimeStamp').once('value').then((snapshot) => {
      snapshot.forEach((item) => {
        this.polls.push(item.val());
      });
    });


    console.log('polls = ', this.polls);

    that.store.dispatch(new PollsActions.SetPolls(this.polls));
    that.store.dispatch(new AuthActions.SetUserId('A1234'));

    // that.store.select('polls').subscribe(
    //   data => {
    //     console.log('data 2 = ', data);
    //     const polls2 = data.polls[0];
    //     console.log('data 2a = ', polls2);
    //   });

    // that.store.select('auth').subscribe(data => {
    //   const abc = data.userId;
    //   console.log('data 3 = ', abc);
    // });

    // that.store.select('polls').subscribe(
    //   data => {
    //     console.log('data 2 = ', data);
    //     const polls2 = data.polls[0];
    //     console.log('data 2a = ', polls2);
    //   });

  }
}
