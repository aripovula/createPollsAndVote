import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { FirebaseService } from './firebase.service';
import { envVars } from './../../envVars.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app for creating polls and voting';
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('envVars.apiKey = ' + envVars.apiKey);
    console.log('envVars.authDomain = ' + envVars.authDomain);
    firebase.initializeApp( envVars );
  }

}
