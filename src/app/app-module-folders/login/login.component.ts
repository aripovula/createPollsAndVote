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

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {}

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
