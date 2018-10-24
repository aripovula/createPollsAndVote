import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

// import { AuthGuardService } from './services/auth-guard.service';
// import { FirebaseService } from './services/firebase.service';
import { envVars } from './../../envVars.js';
import { AppState } from './ngrx-store/app-reducers';
import * as authState from './ngrx-store/auth-reducer';
import * as AuthActions from './ngrx-store/auth-action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app for creating polls and voting';
  isLoggedIn = false;
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    console.log('envVars.apiKey = ' + envVars.apiKey);
    console.log('envVars.authDomain = ' + envVars.authDomain);
    firebase.initializeApp( envVars );
    this.store.select('auth').subscribe(
      data => {
        this.isLoggedIn = data.isLoggedIn;
      }
    );

  }

}
