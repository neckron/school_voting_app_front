import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexLegend,
  ApexDataLabels
} from 'ng-apexcharts';
import { CandidateService } from '../../../core/services/candidate.service';
import { NotificationService } from '../../../core/services/notification.service';
import { VoteResult, LocationResult } from '../../../core/models/vote.model';
import { forkJoin } from 'rxjs';

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
}

const CHART_COLORS = ['#004F97', '#FFB300', '#00BCD4', '#4CAF50', '#FF5722', '#9C27B0'];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private candidateService = inject(CandidateService);
  private notify = inject(NotificationService);

  loading = true;

  personeroChart: Partial<ChartOptions> = this.emptyChart('Resultados Personero');
  contrallorChart: Partial<ChartOptions> = this.emptyChart('Resultados Contralor');
  generalChart: Partial<ChartOptions> = this.emptyChart('Participación');

  locationsByPerson: LocationResult[] = [];
  locationsByContrallor: LocationResult[] = [];

  ngOnInit(): void {
    forkJoin({
      personero: this.candidateService.getResultsPersonero(),
      contrallor: this.candidateService.getResultsContrallor(),
      general: this.candidateService.getTotalVoting(),
      locationPerson: this.candidateService.getResultsByLocationPerson(),
      locationContrallor: this.candidateService.getResultsByLocationContrallor()
    }).subscribe({
      next: (results) => {
        this.personeroChart = this.buildChart(results.personero, 'Resultados Personero');
        this.contrallorChart = this.buildChart(results.contrallor, 'Resultados Contralor');
        this.generalChart = this.buildGeneralChart(results.general);
        this.locationsByPerson = results.locationPerson;
        this.locationsByContrallor = results.locationContrallor;
        this.loading = false;
      },
      error: () => {
        this.notify.error('Error al cargar resultados');
        this.loading = false;
      }
    });
  }

  private emptyChart(title: string): Partial<ChartOptions> {
    return {
      series: [],
      chart: { type: 'donut', height: 300 },
      labels: [title],
      colors: CHART_COLORS,
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
    };
  }

  private buildChart(data: VoteResult[], title: string): Partial<ChartOptions> {
    const labels = data.map(d => d.candidate?.[0]?.name ?? 'Sin nombre');
    const series = data.map(d => d.quantity);
    return {
      series,
      chart: { type: 'donut', height: 300 },
      labels,
      colors: CHART_COLORS,
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
    };
  }

  private buildGeneralChart(data: VoteResult[]): Partial<ChartOptions> {
    const labels: string[] = [];
    const series: number[] = [];
    for (const entry of data) {
      labels.push(entry._id === true as unknown as string ? 'Han votado' : 'No han votado');
      series.push(entry.quantity);
    }
    return {
      series,
      chart: { type: 'donut', height: 300 },
      labels,
      colors: ['#004F97', '#e0e0e0'],
      legend: { position: 'bottom' },
      dataLabels: { enabled: true },
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 } } }]
    };
  }
}
