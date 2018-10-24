import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FirebaseService } from './firebase.service';
import { AppState } from '../ngrx-store/app-reducers';
import * as AuthState from '../ngrx-store/auth-reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn$: Observable<boolean>;
  isLoggedIn: boolean;
  constructor(
    public firebaseService: FirebaseService,
    public router: Router,
    private store: Store<AppState>) {
       this.store.select('auth').subscribe(data => this.isLoggedIn = data.isLoggedIn);
     }

  canActivate(): boolean {
    console.log('in canActivate - AuthGuard from Store = ', this.isLoggedIn);
    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return false;
    }
    return true;

    // return this.store.select('auth').map((authState: AuthState.AuthState) => {
    //   return authState.isLoggedIn;
    // });
  }

}
