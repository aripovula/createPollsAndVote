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
  username: string;
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
    this.isAuthenticatedObserver();
  }

  isAuthenticatedObserver() {
    const that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      console.log('in onAuthStateChanged Observer, user = ', user);
      if (user) {
        that.store.dispatch(new AuthActions.SetUser({uid: user.uid, username: user.email}));
        that.store.dispatch(new AuthActions.SetUserId(user.uid));
        // that.store.dispatch(new AuthActions.SetToken(''));
        // this.userLoggedIn = true;
        console.log('LOGGED IN');
        that.router.navigate(['/home']);
      } else {
        that.store.dispatch({type: 'REMOVE_USER'});
        // this.userLoggedIn = false;
        console.log('NOT LOGGED IN');
      }
      that.store.select('auth').subscribe(data => {
        that.isLoggedIn = data.isLoggedIn;
        console.log('that.userLoggedIn = ' + that.isLoggedIn);
        that.username = data.userName;
      });
    });
  }

}
