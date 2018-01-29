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

  private chartColors: any[] = [
    { 
      backgroundColor: ["#b8436d", "#00d9f9", "#a4c73c", "#a4add3"] ,
      borderColor: ["#333333" ,"#333333", "#333333","#333333"]
    }
   ];

  constructor(private candidateService: CandidateService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    this.candidateService.getResultsContrallor().
      map(res => res.json()).
      subscribe((data) => {
        for (const entry of data) {
          console.log('contralor ' + entry);
          this.contrallorChartLabels.push(entry.candidate[0].name);
          this.contrallorChartData.push(entry.quantity);
        }
      });

    this.candidateService.getResultsPersonero().
      map(res => res.json()).
      subscribe((data) => {
        for (const entry of data) {
          console.log('personero ' + entry);
          this.personeroChartLabels.push(entry.candidate[0].name);
          this.personeroChartData.push(entry.quantity);
        }
      });



  }

  ngOnInit() {}

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}
