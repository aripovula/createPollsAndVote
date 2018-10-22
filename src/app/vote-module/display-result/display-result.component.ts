import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { VotesOnPoll } from './../vote-models/votes-on-poll-model';
// import { AVote } from './../vote-models/a-vote-model';
import { FirebaseService } from './../../firebase.service';

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
    responsive: true
  };
  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  // events
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

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
        console.log('in result  poll_id = ', this.poll_id);
        console.log('in result  this.votes_on_poll = ', this.votes_on_poll);

        const xLength = this.votes_on_poll.length;
        this.votes_count = new Array(xLength);
        for (let x = 0; x < xLength; x++) {
          const yLength = this.votes_on_poll[x].aVote.questions.length;
          this.votes_count[x] = new Array(yLength);
          console.log('x=', xLength, ' y= ', yLength);

          for (let y = 0; y < yLength; y++) {
            if (this.votes_count[x][y] == null) { this.votes_count[x][y] = 0; }
            if (this.votes_on_poll[x].aVote.questions[y].type === 0) {
              this.votes_count[x][parseInt(this.votes_on_poll[x].aVote.questions[0].Radio, 10)] =
                this.votes_count[x][parseInt(this.votes_on_poll[x].aVote.questions[0].Radio, 10)] + 1;
            } else {
              for (let z = 0; z < this.votes_on_poll[x].aVote.questions[y].CLs.length; z++) {
                if (this.votes_on_poll[x].aVote.questions[y].CLs != null ) {
                  if (this.votes_on_poll[x].aVote.questions[y].CLs[z].isQSelected) {
                    this.votes_count[x][z] = this.votes_count[x][z] + 1;
                  }
                }
              }
            }
          }
        }
        console.log('final count = ', this.votes_count);
      });
  }
}
