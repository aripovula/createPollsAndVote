import { Component, OnInit, Input } from '@angular/core';

import { NewPoll } from './../../new_poll-module/models/new_poll-model';

@Component({
  selector: 'app-copy-or-move',
  templateUrl: './copy-or-move.component.html',
  styleUrls: ['./copy-or-move.component.css']
})
export class CopyOrMoveComponent implements OnInit {

  @Input() polls: Array<NewPoll>;
  @Input() copyOrMove: string;
  @Input() questionNameToCopyMove: string;
  constructor() { }

  ngOnInit() {
  }

  onCopyMoveConfirm() {
    console.log('move confirmed');
  }
}
