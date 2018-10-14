import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
// import { Router } from '@angular/router';

import { NewPoll } from '../../new_poll-module/models/new_poll-model';
import { FirebaseService } from './../../firebase.service';
import { AppState } from '../../ngrx-store/app-reducers';
// import * as authState from '../../ngrx-store/auth-reducer';
// import * as AuthActions from './../../ngrx-store/auth-action';
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
    // private router: Router
  ) {}

  ngOnInit() {
    this.firebaseService.fetchPollsAndSaveToStore();
    this.store.select('polls').subscribe(data => {this.polls = data.polls; });
  }

  onDeletePollClicked(uid) {
    this.firebaseService.deletePollFromDBandDeleteFromStore(uid);
  }
}
