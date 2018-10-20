import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { NewOption } from './../../new_poll-module/models/new_option-model';

@Component({
  selector: 'app-vote-option-item',
  templateUrl: './vote-option-item.component.html',
  styleUrls: ['./vote-option-item.component.css']
})
export class VoteOptionItemComponent implements OnInit {

  @Input() option: NewOption;
  @Input() ind: number;
  @Input() imageFile: any;
  @Input() safeURLimage: string;
  @Input() safeURL: string;
  @Input() WebURL: string;
  @Input() imageSize: number;

  sizes = [100, 150, 250];
  sizesW = [178, 266, 444];

  constructor() { }

  ngOnInit() {
  }

  goToUrl(): void {
    window.open(this.WebURL, '_blank');
  }
}
