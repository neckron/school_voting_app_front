import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(username: string, password: string) {
    return this.http.post(environment.apiUrl + 'user/login', {username: username, password: password});
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}
