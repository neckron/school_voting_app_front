import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .map(res => res.json())
      .subscribe((data) => {
        if (data.user.userrole === 'ADMIN') {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['vote']);
        }
        localStorage.setItem('currentUser', JSON.stringify(data));
      },
      error => {
        console.log(error);
        this.loading = false;
      });
  /*subscribe((data) => {
    if (data.user.userrole === 'ADMIN') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['vote']);
    }
  },
  error => {
    console.log(error);
    this.loading = false;
  });*/
  /*.subscribe(
  data => {
    console.log(data)
   if (data.user.userrole === 'ADMIN') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['vote']);
    }
  },
  error => {
    console.log(error);
    this.loading = false;
  });*/
}

}
