import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as firebase from "firebase";

import { envVars } from "./../../envVars.js";
import { AppState } from "./ngrx-store/app-reducers";
import * as authState from "./ngrx-store/auth-reducer";
import * as AuthActions from "./ngrx-store/auth-action";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app for creating polls and voting";
  isLoggedIn = false;
  loginPoll = null;
  username: string;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    console.log("LOGS ARE NOT REMOVED ON PURPOSE");
    // console.log('envVars.apiKey = ' + envVars.apiKey);
    // console.log('envVars.authDomain = ' + envVars.authDomain);
    firebase.initializeApp(envVars);
    this.store.select("auth").subscribe(data => {
      this.isLoggedIn = data.isLoggedIn;
      this.loginPoll = data.loginPoll;
    });
    this.isAuthenticatedObserver();
  }

  isAuthenticatedObserver() {
    const that = this;
    firebase.auth().onAuthStateChanged(function(user) {
      console.log("in onAuthStateChanged Observer, user = ", user);
      if (user) {
        that.store.dispatch(
          new AuthActions.SetUser({
            uid: user.uid,
            username: user.email,
            loginPoll: that.loginPoll
          })
        );
        console.log("LOGGED IN");
        // if user added poll code upon logging in go directly to that poll
        if (that.loginPoll != null) {
          that.router.navigate(["/vote", that.loginPoll]);
        } else {
          that.router.navigate(["/home"]);
        }
      } else {
        that.store.dispatch({ type: "REMOVE_USER" });
        // this.userLoggedIn = false;
        console.log("NOT LOGGED IN");
      }
      that.store.select("auth").subscribe(data => {
        that.isLoggedIn = data.isLoggedIn;
        console.log("that.userLoggedIn = " + that.isLoggedIn);
        that.username = data.userName;
      });
    });
  }

  onSourceClicked() {
    console.log("in onSourceClicked");
    window.open("https://github.com/aripovula/createPollsAndVote", "_blank");
  }
}
