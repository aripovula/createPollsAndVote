import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { FirebaseService } from './../../services/firebase.service';
import { AppState } from '../../ngrx-store/app-reducers';
import * as authState from '../../ngrx-store/auth-reducer';
import * as AuthActions from '../../ngrx-store/auth-action';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  accessCode = '9cd74ccb-dedc-0cca-aa0c-0fc9cd8f7142';
  AlexRN = Math.floor(Math.random() * Math.floor(10000000));
  AnnRN = Math.floor(Math.random() * Math.floor(10000000));
  JohnRN = Math.floor(Math.random() * Math.floor(10000000));
  loginForm = new FormGroup({
    username: new FormControl(`alex${this.AlexRN}@example.com`, [Validators.required, Validators.minLength(3), Validators.email]),
    password: new FormControl('alexalex1', [Validators.required, Validators.minLength(6)]),
    user: new FormControl(`Alex`),
    accessCode: new FormControl(this.accessCode),
    useAccessCode: new FormControl('')
  });
  prevUser = null;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.loginForm.valueChanges.subscribe(() => {
    //   console.warn(this.loginForm.value);
    // });
  }

  onUserChange() {
    console.log('this.loginForm.value.user = ', this.loginForm.value.user);
    if (this.prevUser !== this.loginForm.value.user) {
      this.prevUser = this.loginForm.value.user;
      if (this.loginForm.value.user.includes('Alex')) {
        this.loginForm.setValue({
          username: 'alex' + this.AlexRN + '@example.com', password: 'alexalex1',
          user: 'Alex', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user.includes('Ann')) {
        this.loginForm.setValue({
          username: 'ann' + this.AnnRN + '@example.com', password: 'annann12',
          user: 'Ann', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user.includes('John')) {
        this.loginForm.setValue({
          username: 'john' + this.JohnRN + '@doe.com', password: 'johnjohn1',
          user: 'John', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user.includes('new')) {
        this.loginForm.setValue({
          username: '', password: 'Standard1',
          user: 'new', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
    }
  }

  onSubmit() {
    console.warn(this.loginForm.value);
    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const useAccessCode = this.loginForm.value.useAccessCode;
    const accessCode = useAccessCode ? this.loginForm.value.accessCode : null;
    console.log('in MODAL ' + email + ' ' + password);
    this.firebaseService.signInAUser(email, password, accessCode);
  }
}
