import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit {

  @Input() votes_count: Array<Array<number>>;
  // barChartOptions: any = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // barChartLabels: string[] = ['a', 'b'];
  // barChartType = 'bar';
  // barChartLegend = true;

  // barChartData: any[] = [
  //   { data: this.votes_count[0], label: 'Series A' },
  //   // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];

  // // events
  // chartClicked(e: any): void {
  //   console.log(e);
  // }

  // chartHovered(e: any): void {
  //   console.log(e);
  // }

  // randomize(): void {
  //   // Only Change 3 values
  //   const data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  //   const clone = JSON.parse(JSON.stringify(this.barChartData));
  //   clone[0].data = data;
  //   this.barChartData = clone;
  //   /**
  //    * (My guess), for Angular to recognize the change in the dataset
  //    * it has to change the dataset variable directly,
  //    * so one way around it, is to clone the data, change it and then
  //    * assign it;
  //    */
  // }

  constructor() { console.log('votes_count = ', this.votes_count);
   }

  ngOnInit() {
  }
}
