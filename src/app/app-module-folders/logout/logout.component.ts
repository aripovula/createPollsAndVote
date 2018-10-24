import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from './../../services/firebase.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.signOut();
    this.router.navigate(['/login']);
  }

}
