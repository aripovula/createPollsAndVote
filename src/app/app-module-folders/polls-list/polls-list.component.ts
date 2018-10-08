import { SetPolls } from './../../ngrx-store/polls-action';
import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';


@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  q_text = '';
  polls: Array<NewPoll>;
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
      // console.log('1', questions);
      // console.log('1a', questions[Object.keys(questions)[0]]);
      // that.q_text = snapshot.val()[0].q_text;
      // console.log('2', that.q_text);
    });
  }



}
