import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NewOption } from './../models/new_option-model';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.css']
})
export class OptionItemComponent implements OnInit {
  @Input() option: NewOption;
  @Input() ind: number;
  @Input() imageFile: any;
  @Input() safeURLimage: string;
  @Input() safeURL: string;
  @Input() imageSize: number;
  @Output() voted = new EventEmitter<boolean>();

  sizes = [ 100, 150, 250 ];
  sizesW = [ 178, 266, 444 ];

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
