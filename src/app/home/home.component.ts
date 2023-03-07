// import { User } from '../models';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CandidateService} from '../services/candidate.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  currentUser: any;
  contrallorChartLabels: string[] = [];
  contrallorChartData: number[] = [];
  contrallorChartType: String = 'pie';
  personeroChartLabels: string[] = [];
  personeroChartData: number[] = [];
  personeroChartType: String = 'pie';
  public chartOptions: any = {responsive: true};
  public chartLegend = true;
  generalChartLabels: string[] = [];
  generalChartData: number[] = [];
  generalChartType: String = 'pie';
  locationsByPerson: Response;
  locationsByContrallor: Response;

  public chartColors: any[] = [
    {
      backgroundColor: ["#FF0000", "#FF7400", "#00FFFF", "#00FF00", "#CB5AF3"],
      borderColor: ["#333333", "#333333", "#333333", "#333333", "#333333"]
    }
  ];

  constructor(private candidateService: CandidateService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  ngOnInit() {

    this.candidateService.getResultsContrallor().
      map(res => res.json()).
      subscribe((data) => {
        for (const entry of data) {
          this.contrallorChartLabels.push(entry.candidate[0].name);
          this.contrallorChartData.push(entry.quantity);
        }
      });

    this.candidateService.getResultsPersonero().
      map(res => res.json()).
      subscribe((data) => {
        for (const entry of data) {
          this.personeroChartLabels.push(entry.candidate[0].name);
          this.personeroChartData.push(entry.quantity);
        }
      });

    this.candidateService.getTotalVoting().
      map(res => res.json()).
      subscribe((data) => {
        for (const entry of data) {
          if (entry._id === true) {
            console.log(entry);
            this.generalChartLabels.push('Han votado');
            this.generalChartData.push(entry.quantity);
          } else if (entry._id === false) {
            console.log(entry);
            this.generalChartLabels.push('No han votado');
            this.generalChartData.push(entry.quantity);
          }
        }
      });

      this.candidateService.getTResultsByLocationPerson()
       .map(res => res.json()).
      subscribe((data) => {
        this.locationsByPerson = data;
      });

      this.candidateService.getTResultsByLocationContrallor()
       .map(res => res.json()).
      subscribe((data) => {
        this.locationsByContrallor = data;
      });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
