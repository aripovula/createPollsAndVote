import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { NewPoll } from '../../new_poll-module/models/new_poll-model';

@Component({
  selector: 'app-polls-list',
  templateUrl: './polls-list.component.html',
  styleUrls: ['./polls-list.component.css']
})
export class PollsListComponent implements OnInit {
  q_text = '';
  polls: Array<NewPoll>;
  constructor() { }

  ngOnInit() {
    const that = this;
    this.polls = [];
    return firebase.database().ref('/polls/').once('value').then((snapshot) => {
      snapshot.forEach((item) => {
        this.polls.push(item.val());
      });
      // console.log('1', questions);
      // console.log('1a', questions[Object.keys(questions)[0]]);
      // that.q_text = snapshot.val()[0].q_text;
      // console.log('2', that.q_text);
    });
  }



}
