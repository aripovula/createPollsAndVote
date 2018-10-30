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
  accessCode = '058d32a7-79b0-c5ee-1a9a-dbbf5841c8cb';
  loginForm = new FormGroup({
    username: new FormControl('alex@example.com', [Validators.required, Validators.minLength(3), Validators.email]),
    password: new FormControl('alexalex1', [Validators.required, Validators.minLength(6)]),
    user: new FormControl('Alex'),
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
      if (this.loginForm.value.user === 'Alex') {
        this.loginForm.setValue({
          username: 'alex@example.com', password: 'alexalex1',
          user: 'Alex', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user === 'Ann') {
        this.loginForm.setValue({
          username: 'ann@example.com', password: 'annann12',
          user: 'Ann', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user === 'John') {
        this.loginForm.setValue({
          username: 'john@doe.com', password: 'johnjohn1',
          user: 'John', accessCode: this.accessCode, useAccessCode: ''
        }, { emitEvent: false });
      }
      if (this.loginForm.value.user === 'new') {
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
