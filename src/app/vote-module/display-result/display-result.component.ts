import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { VotesOnPoll } from './../vote-models/votes-on-poll-model';
import { FirebaseService } from './../../services/firebase.service';
import { AppState } from '../../ngrx-store/app-reducers';
import * as questionsState from '../../ngrx-store/questions-reducer';
import * as QuestionsActions from '../../ngrx-store/questions-action';


@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {

  poll_id;
  votes_on_poll: Array<VotesOnPoll>;
  votes_count: any;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        }
      }]
    }
  };
  barChartLabels: Array<Array<number>>;
  barChartType = 'bar';
  barChartLegend = false;
  barChartData: any[];
  chartColors: any[] = [{ backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0'] }];

  pieChartLabels: Array<Array<number>>;
  pieChartData: number[];
  pieChartType = 'pie';
  question_ids = [];

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    this.firebaseService.fetchVotedQuestions(this.poll_id)
      .then((data: Array<VotesOnPoll>) => {
        this.votes_on_poll = data;

        // prepare two-diamentional array
        const anyVote = this.votes_on_poll[0];
        const x_Length = anyVote.aVote.questions.length;
        this.votes_count = new Array(x_Length);
        this.barChartLabels = new Array(x_Length);
        this.pieChartLabels = new Array(x_Length);
        for (let x = 0; x < x_Length; x++) {
          const y_Length = anyVote.aVote.questions[x].questionsQnty;
          this.votes_count[x] = new Array(y_Length);
          this.barChartLabels[x] = new Array(y_Length);
          this.pieChartLabels[x] = new Array(y_Length);
          this.question_ids[x] = anyVote.aVote.questions[x].questionID;
          for (let y = 0; y < y_Length; y++) {
            this.votes_count[x][y] = 0;
            this.barChartLabels[x][y] = y + 1;
            this.pieChartLabels[x][y] = y + 1;
          }
        }
        this.barChartData = new Array(x_Length);

        // summarize votes
        for (let vote = 0; vote < this.votes_on_poll.length; vote++) {
          const nextVote = this.votes_on_poll[vote];
          const xLength = nextVote.aVote.questions.length;
          for (let x = 0; x < xLength; x++) {
            if (nextVote.aVote.questions[x].type === 0) {
              this.votes_count[x][parseInt(nextVote.aVote.questions[x].Radio, 10)] =
                this.votes_count[x][parseInt(nextVote.aVote.questions[x].Radio, 10)] + 1;
            } else {
              if (nextVote.aVote.questions[x].CLs != null) {
                for (let z = 0; z < nextVote.aVote.questions[x].CLs.length; z++) {
                  if (nextVote.aVote.questions[x].CLs[z].isQSelected) {
                    this.votes_count[x][z] = this.votes_count[x][z] + 1;
                  }
                }
              }
            }
          }
        }
        console.log('final count = ', this.votes_count);
        console.log('count[0] = ', this.votes_count[0]);
        for (let x = 0; x < this.votes_on_poll[0].aVote.questions.length; x++) {
          this.barChartData[x] = [
            { data: this.votes_count[x], label: ''}
          ];
        }
        // this.pieChartData = [this.votes_count[0]];

      });
  }
}
