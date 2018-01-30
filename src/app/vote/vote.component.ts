import {Component, OnInit} from '@angular/core';
import {CandidateService} from '../services/candidate.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  contrallors: Response;
  personeros: any[];
  personeroChosen;
  contrallorChosen;
  personeroActivated = true;
  contrallorActivated = true;
  currentUser;

  constructor(
    private candidateService: CandidateService,
    private router: Router,
    private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;

    this.candidateService.getContrallor().
      map(res => res.json()).
      subscribe((data) => {
        this.contrallors = data;
      });

    this.candidateService.getPersonero().
      map(res => res.json()).
      subscribe((data) => {
        this.personeros = data;
      });
  }

  personeroVote(param) {
    this.personeroChosen = param;
    this.personeroActivated = !this.personeroActivated;
  }

  contrallorVote(param) {
    this.contrallorChosen = param;
    this.contrallorActivated = !this.contrallorActivated;
  }

  cancelElection() {
    this.contrallorActivated = true;
    this.personeroActivated = true;
  }

  confirmElection() {
    this.candidateService.vote(this.personeroChosen._id, this.contrallorChosen._id)
      .subscribe(
      data => {
        this.auth.logout();
        this.router.navigate(['logout']);
      });

  }
}
