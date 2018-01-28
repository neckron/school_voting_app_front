import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {AppSettings} from 'app/app.settings';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http.post(environment.apiUrl + 'user/login', {username: username, password: password});
           /* .map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                  console.log(user.json().);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.json());
                }

                return user.json();
            });*/
  }
    /*return this.http.post(AppSettings.API_ENDPOINT + 'user/login', {username: username, password: password})
       .map(res => console.log(res.json()));
      .map(res => console.log(res.json()) {
        // login successful if there's a jwt token in the response
        if(res) {
          console.log('en auth: ' + res.json());
          const user = res.json();
          console.log('en login ' + user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', user);
        }
        return res;
      });*/



logout() {
  console.log('Login out');
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}
}