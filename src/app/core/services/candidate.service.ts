import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Candidate } from '../models/candidate.model';
import { VoteResult, LocationResult } from '../models/vote.model';

// Base URL of the API without the /api/ suffix, used to resolve relative image paths
const apiOrigin = environment.apiUrl.replace(/\/api\/?$/, '');

@Injectable({ providedIn: 'root' })
export class CandidateService {
  private http = inject(HttpClient);

  /** Resolves a pictureURI to a full URL. Absolute URLs are returned as-is. */
  photoUrl(uri: string): string {
    if (!uri) return 'assets/escudo.png';
    if (uri.startsWith('http')) return uri;
    return `${apiOrigin}${uri}`;
  }

  getCandidates(type: string): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(environment.apiUrl + 'candidate/' + type);
  }

  getPersonero(): Observable<Candidate[]> {
    return this.getCandidates('PERSONERO');
  }

  getContrallor(): Observable<Candidate[]> {
    return this.getCandidates('CONTRALLOR');
  }

  vote(personeroId: string, contrallorId: string): Observable<unknown> {
    const stored = localStorage.getItem('currentUser');
    const parsed = stored ? JSON.parse(stored) : null;
    const token = parsed?.token ?? '';
    const userId = parsed?.user?._id ?? '';
    const locationId = parsed?.user?.location ?? '';

    const headers = new HttpHeaders({
      'x-access-token': token,
      'Content-Type': 'application/json'
    });

    return this.http.post(
      environment.apiUrl + 'user/vote',
      { personVoteId: personeroId, contrallorVoteId: contrallorId, userId, location: locationId },
      { headers }
    );
  }

  getResultsPersonero(): Observable<VoteResult[]> {
    return this.http.get<VoteResult[]>(environment.apiUrl + 'vote/results/personero');
  }

  getResultsContrallor(): Observable<VoteResult[]> {
    return this.http.get<VoteResult[]>(environment.apiUrl + 'vote/results/contrallor');
  }

  getTotalVoting(): Observable<VoteResult[]> {
    return this.http.get<VoteResult[]>(environment.apiUrl + 'vote/results/general');
  }

  getResultsByLocationPerson(): Observable<LocationResult[]> {
    return this.http.get<LocationResult[]>(environment.apiUrl + 'vote/results/locationPerson');
  }

  getResultsByLocationContrallor(): Observable<LocationResult[]> {
    return this.http.get<LocationResult[]>(environment.apiUrl + 'vote/results/location');
  }
}
