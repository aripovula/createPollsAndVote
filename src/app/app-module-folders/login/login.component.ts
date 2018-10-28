import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FirebaseService } from './../../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('alex@example.com'),
    password: new FormControl('alexalex1'),
    user: new FormControl('Alex'),
  });

  accessCodeForm = new FormGroup({
    accessCode: new FormControl('AQ12Y84'),
  });

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.loginForm.value.user === 'Alex') {
        this.loginForm.setValue({ username: 'alex@example.com', password: 'alexalex1', user: 'Alex' }, {emitEvent: false});
      }
      if (this.loginForm.value.user === 'Ann') {
        this.loginForm.setValue({ username: 'ann@example.com', password: 'annann12', user: 'Ann' }, {emitEvent: false});
      }
      if (this.loginForm.value.user === 'John') {
        this.loginForm.setValue({ username: 'john@doe.com', password: 'johnjohn1', user: 'John' }, {emitEvent: false});
      }
      if (this.loginForm.value.user === 'new') {
        this.loginForm.setValue({ username: '', password: '', user: 'new' }, {emitEvent: false});
      }
      console.warn(this.loginForm.value);
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.loginForm.value);
    const email = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    console.log('in MODAL ' + email + ' ' + password);
    this.firebaseService.signInAUser(email, password);
  }

  onSubmitWithCode() {
    // TODO: Use EventEmitter with form value
    console.warn(this.accessCodeForm.value);
  }
}
