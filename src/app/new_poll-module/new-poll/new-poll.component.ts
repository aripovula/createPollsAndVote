import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';
import { Store } from '@ngrx/store';

import { FirebaseService } from './../../services/firebase.service';
import { NewPoll } from './../models/new_poll-model';
import { AppState } from '../../ngrx-store/app-reducers';
import * as pollsState from '../../ngrx-store/polls-reducer';
import * as authState from '../../ngrx-store/auth-reducer';
import * as PollsActions from '../../ngrx-store/polls-action';
import * as AuthActions from './../../ngrx-store/auth-action';


@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.css']
})

export class NewPollComponent implements OnInit {
  model = new NewPoll(null, null, null, 'public', 'anonymous', null, null, moment().valueOf(), 0, '', 'withusernames', null, false);
  poll_id = null;
  expiresDateTime = '';
  changeDate = true;
  isNoSelfAccessInUserList = false;
  isNoSelfAccessInDomainList = false;
  pollForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    expiresDateTime: new FormControl('', [Validators.required, Validators.minLength(2)]),
    comment: new FormControl(),
    questionsQnty: new FormControl('', [Validators.required, Validators.minLength(1)]),
    privateAccessorsList: new FormControl(''),
    domains: new FormControl(''),
    accessType: new FormControl('public'),
    nameDiscloseOption: new FormControl('anonymous'),
    privateAccessType: new FormControl('withusernames')
  });

  // id, name, questionsQnty, accessType, nameDiscloseOption, createdBy,
  // createdTimeStamp, expiresAt, comment, accessTypeType, accessTypeors

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.poll_id = this.route.snapshot.paramMap.get('poll_id');
    console.log('poll_id = ', this.poll_id);
    if (this.poll_id != null) {
      this.store.select('polls').subscribe(
        data => {
          if (data != null && data.polls != null) {
            this.selectAPollById(data.polls);
          } else {
            return this.firebaseService.fetchPollsAndSaveToStore()
              .then((thePolls) => { this.selectAPollById(thePolls); });
          }
        });
    }
  }

  selectAPollById(polls) {
    const data2 = polls.filter(({ id }) => id === this.poll_id);
    this.model = data2[0];
    if (this.model != null) {
      this.changeDate = false;
    }
    this.pollForm.setValue({
      accessType: this.model.accessType,
      comment: this.model.comment != null ? this.model.comment : '',
      domains: this.model.privateAccessType === 'withdomain' ? this.model.privateAccessorsList : '',
      expiresDateTime: this.model.expiresTimeStamp,
      name: this.model.name, nameDiscloseOption: this.model.nameDiscloseOption,
      questionsQnty: this.model.questionsQnty,
      privateAccessType: this.model.privateAccessType,
      privateAccessorsList: this.model.privateAccessType === 'withusernames' ? this.model.privateAccessorsList : '',
    }, { emitEvent: false });
  }

  onChangeDateClicked() {
    this.changeDate = true;
  }

  onAccessTypeChange() {
    this.model.accessType = this.pollForm.value.accessType;
    if (this.model.accessType === 'private') {
      if (this.pollForm.value.privateAccessType === 'withusernames') {
        this.pollForm.get('privateAccessorsList').setValidators([Validators.required]);
      } else if (this.pollForm.value.privateAccessType === 'withdomain') {
        this.pollForm.get('domains').setValidators([Validators.required]);
      }
    } else if (this.model.accessType === 'public') {
      this.pollForm.get('privateAccessorsList').clearValidators();
      this.pollForm.get('domains').clearValidators();
    }
    this.pollForm.get('privateAccessorsList').updateValueAndValidity();
    this.pollForm.get('domains').updateValueAndValidity();
  }

  onPrivateTypeChange() {
    this.model.privateAccessType = this.pollForm.value.privateAccessType;
  }

  onAccessorListChange() {
    // TODO: check each value is e-mail
    this.model.privateAccessorsList = this.pollForm.value.privateAccessorsList;
    if (this.model.privateAccessorsList.search(this.firebaseService.user_name) > -1) {
      this.isNoSelfAccessInUserList = false;
    } else {
      this.isNoSelfAccessInUserList = true;
    }
  }

  onDomainListChange() {
    // TODO: add domain validation using Regex
    let isFound = false;
    this.model.privateAccessorsList = this.pollForm.value.domains;
    const domainsArray = this.pollForm.value.domains.split(',');
    for (const aDomain of domainsArray) {
      if (this.firebaseService.user_name.search(aDomain.trim()) > -1) {
        isFound = true;
      }
    }
    if (isFound) {
      this.isNoSelfAccessInDomainList = false;
    } else {
      this.isNoSelfAccessInDomainList = true;
    }
  }

  getValuesFromForm() {
    let accessList = '';
    this.model.accessType = this.pollForm.value.accessType;
    this.model.comment = this.pollForm.value.comment;
    this.model.name = this.pollForm.value.name;
    this.model.nameDiscloseOption = this.pollForm.value.nameDiscloseOption;
    this.model.privateAccessType = this.pollForm.value.privateAccessType;
    this.model.questionsQnty = this.pollForm.value.questionsQnty;
    this.model.createdBy = this.firebaseService.user_id;
    this.model.createdByUsername = this.firebaseService.user_name;
    if (this.pollForm.value.privateAccessorsList != null && this.model.privateAccessType === 'withusernames') {
      accessList = this.pollForm.value.privateAccessorsList;
    } else if (this.pollForm.value.domains != null && this.model.privateAccessType === 'withdomain') {
      accessList = this.pollForm.value.domains;
    }
    this.model.privateAccessorsList = accessList;
  }

  onSubmit() {
    let uid;
    console.log('poll_id = ', this.poll_id);
    console.log('expiresTimeStamp = ', this.expiresDateTime);
    console.log('expiresTimeStamp.length = ', this.expiresDateTime.length);

    if (this.poll_id == null) {
      uid = UUID.UUID();
      this.model.id = uid;
      this.getValuesFromForm();
      this.model.expiresTimeStamp = moment(this.pollForm.value.expiresDateTime).valueOf() * 1;
      console.log('model.expires = ', this.model.expiresTimeStamp);
      this.firebaseService.saveNewPollToDB(this.model, uid);
      this.router.navigate(['/questions', this.model.questionsQnty, uid]);
    } else {
      uid = this.model.id;
      this.getValuesFromForm();
      if (this.changeDate) {
        this.model.expiresTimeStamp = moment(this.pollForm.value.expiresDateTime).valueOf() * 1;
      }
      console.log('model.expires = ', this.model.expiresTimeStamp);
      this.firebaseService.updatePollInDB(this.model, uid);
      this.router.navigate(['/viewquestions', this.poll_id]);
    }
  }
}
