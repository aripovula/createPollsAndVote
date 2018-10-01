import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input } from '@angular/core';

import { NewOption } from './../models/new_option-model';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrls: ['./option-item.component.css']
})
export class OptionItemComponent implements OnInit {
  @Input() option: NewOption;
  @Input() ind: number;
  @Input() safeURLimage: string;
  @Input() safeURL: string;
  @Input() imageSize: number;

  sizes = [ 100, 150, 250 ];
  sizesW = [ 178, 266, 444 ];

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
