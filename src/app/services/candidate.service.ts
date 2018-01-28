import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
//import {AppSettings} from '../app.settings';
import { environment } from '../../environments/environment';

@Injectable()
export class CandidateService {


  constructor(
    private http: Http
  ) {}

  getContrallor() {
    return this.getCandidates('CONTRALLOR');
  }

  getPersonero() {
    return this.getCandidates('PERSONERO');
  }

  getCandidates(type) {
    return this.http.get(environment.apiUrl + 'candidate/' + type);
  }

  vote(personeroId: string, contrallorId: string) {
    const headers = new Headers();
    const token = JSON.parse(localStorage.getItem('currentUser')).token;
    const userId = JSON.parse(localStorage.getItem('currentUser')).user._id;
   // console.log('votando ' + JSON.parse(localStorage.getItem('currentUser'))._body);
    headers.append('x-access-token', token);
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers : headers});
    return this.http.post(environment.apiUrl + 'user/vote',
      JSON.stringify({personVoteId: personeroId, contrallorVoteId: contrallorId, userId: userId }), options)
      .map(result => result);
  }

}
