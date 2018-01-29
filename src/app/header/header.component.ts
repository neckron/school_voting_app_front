import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: String;
  constructor(private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user.name;
  }

  ngOnInit() {}

}
