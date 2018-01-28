// import { User } from '../models';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: any;

    constructor() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser.user);
    }

    ngOnInit() {
        // this.loadAllUsers();
    }
  
    

}