import { Component, OnInit, Input, Output, EventEmitter, Inject} from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
// import { DOCUMENT } from '@angular/common';

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
  @Input() WebURL: string;
  @Input() imageSize: number;
  @Input() dateTimeToDisplay1: string;
  @Input() dateTimeToDisplay2: string;
  @Output() voted = new EventEmitter<boolean>();

  sizes = window.innerWidth > 800 ? [100, 150, 250] : [100, 100, 100];
  sizesW = window.innerWidth > 800 ? [178, 266, 444] : [178, 178, 178];


  constructor() { }

  ngOnInit() {
  }

  goToUrl(): void {
    window.open( this.WebURL, '_blank');
}

}
