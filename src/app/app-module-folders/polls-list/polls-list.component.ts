import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as authState from '../../ngrx-store/auth-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';
import * as AuthActions from './../../ngrx-store/auth-action';


@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  q_text = '';
  polls: Array<NewPoll>;
  polls2: Array<NewPoll>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    const that = this;
    this.polls = [];
    return firebase.database().ref('/polls/').once('value').then((snapshot) => {
      snapshot.forEach((item) => {
        this.polls.push(item.val());
      });
      console.log('polls = ', this.polls);

      that.store.dispatch(new PollsActions.SetPolls(this.polls));
      that.store.dispatch(new PollsActions.SetPolls(this.polls));
      that.store.dispatch(new AuthActions.SetUserId('A1234'));
      that.store.dispatch(new AuthActions.SetUserId('A1234'));

      that.store.select('polls').subscribe(
        data => {
          console.log('data 2 = ', data);
          this.polls2 = data[0];
          console.log('data 2a = ', this.polls2);
        });

        that.store.select('auth').subscribe(data => {
          const abc = data.userId;
          console.log('data 3 = ', abc);
        });


      that.store.select('polls').subscribe(
        data => {
          console.log('data 2 = ', data);
          this.polls2 = data[0];
          console.log('data 2a = ', this.polls2);
        });


    });
  }
}
