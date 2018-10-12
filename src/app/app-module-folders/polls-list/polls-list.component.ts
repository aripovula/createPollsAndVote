import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { FirebaseService } from './../../firebase.service';
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

  constructor(
    private store: Store<AppState>,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    const that = this;
    firebase.database().ref('/polls/').orderByChild('createdTimeStamp').once('value').then((snapshot) => {
      that.polls = new Array();
      snapshot.forEach((item) => {
        that.polls.push(item.val());
      });
      that.store.dispatch(new PollsActions.SetPolls(that.polls));
      console.log('polls = ', that.polls);
    });

    that.store.dispatch(new AuthActions.SetUserId('A1234'));

    // that.store.select('polls').subscribe(
    //   data => {
    //     console.log('data 2 = ', data);
    //     const polls2 = data.polls[0];
    //     console.log('data 2a = ', polls2);
    //   });
  }

  onDeletePollClicked(id) {
    this.firebaseService.deletePollFromDB(id);
    this.store.dispatch(new PollsActions.RemovePoll(id));
    this.router.navigate(['/home']);
  }
}
