import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { NewOption } from './../models/new_option-model';
import { OptionItemComponent } from './../option-item/option-item.component';

@Component({
  selector: 'app-preview-question',
  templateUrl: './preview-question.component.html',
  styleUrls: ['./preview-question.component.css']
})
export class PreviewQuestionComponent implements OnInit, OnChanges {

  @Input() q_text: string;
  @Input() multipleChoice: string;
  // @Input() option: NewOption;
  @Input() q_options: Array<NewOption>;
  // @Input() ind: number;
  @Input() safeURLimage: string;
  @Input() safeURL: string;
  @Input() imageSize: number;

  @Input() addedChecklists: Array<{ id: 0, isSelected: false }>;
  @Input() multipleChoiceOption: string;
  @Input() multipleChoiceOptionQnty: number;
  @Input() shouldCLsValidBeSetToFalse: boolean;
  @Input() shouldCheckComplianceWithMultiOptionsConditions: boolean;
  @Output() buttonValid: EventEmitter<boolean> = new EventEmitter<boolean>();

  sizes = [100, 150, 250];
  sizesW = [178, 266, 444];

  radioButtonClicked = false;
  selectedCLs = 0;
  CLsValid = false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('shouldCLsValidBeSetToFalse = ', this.shouldCLsValidBeSetToFalse);
    console.log('shouldCheckComplianceWithMultiOptionsConditions', this.shouldCheckComplianceWithMultiOptionsConditions);
    if (this.shouldCLsValidBeSetToFalse) {
        this.CLsValid = false;
        this.buttonValid.emit(false);
        this.radioButtonClicked = false;
    }
    if (this.shouldCheckComplianceWithMultiOptionsConditions) {
      this.checklistsSelectedComplyWithMultiOptionsConditions();
    }
  }

  checklistsSelectedComplyWithMultiOptionsConditions() {
    this.CLsValid = false;
    this.buttonValid.emit(false);
    if (this.multipleChoiceOption === 'oneormore') {
      if (this.selectedCLs > 0) { this.CLsValid = true; this.buttonValid.emit(true); }
    } else if (this.multipleChoiceOption === 'exactly') {
      if (this.selectedCLs === this.multipleChoiceOptionQnty) { this.CLsValid = true; this.buttonValid.emit(true); }
    } else if (this.multipleChoiceOption === 'lessthan' && this.selectedCLs > 0) {
      if (this.selectedCLs < this.multipleChoiceOptionQnty) { this.CLsValid = true; this.buttonValid.emit(true); }
    } else if (this.multipleChoiceOption === 'morethan') {
      if (this.selectedCLs > this.multipleChoiceOptionQnty) { this.CLsValid = true; this.buttonValid.emit(true); }
    }
  }

  onSelectedChange(e) {
    // const toTrue = -1;
    // const parsed_e = parseInt(e, 10);
    // console.log('isSelected = ', e.update.value);
    console.log('isSelected = ', e);
    // console.log('this.addedChecklists Before = ', this.addedChecklists);
    // for (let step = 0; step < this.addedChecklists.length; step++) {
    //   this.addedChecklists[step].isSelected = false;
    //   console.log('step.toString === e -> ', this.addedChecklists[step].id, parsed_e, this.addedChecklists[step].id === parsed_e);

    //   if (this.addedChecklists[step].id === parsed_e) { toTrue = step; }
    // }
    // this.addedChecklists[toTrue].isSelected = true;
    this.selectedCLs = 0;
    this.buttonValid.emit(true);
    for (let step = 0; step < this.addedChecklists.length; step++) {
      if (this.addedChecklists[step].isSelected) { this.selectedCLs++; }
    }
    this.checklistsSelectedComplyWithMultiOptionsConditions();
    console.log('selected = ' + this.selectedCLs);

    console.log('this.addedChecklists After = ', this.addedChecklists);
  }

  onSelectedChangeRadio(e) {
    console.log('in onSelectedChangeRadio', e);
    // if (this.radioButtonClicked) {
      this.CLsValid = true;
      this.buttonValid.emit(true);
    // } else {
    //   this.CLsValid = false;
    //   this.buttonValid.emit(false);
    // }
  }
}
