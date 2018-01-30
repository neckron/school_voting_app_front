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
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}
