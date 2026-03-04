import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, PendingVoter } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-pending-voters',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './pending-voters.component.html',
  styleUrl: './pending-voters.component.scss'
})
export class PendingVotersComponent implements OnInit {
  private authService = inject(AuthService);
  private notify = inject(NotificationService);

  loading = false;
  loaded = false;
  pendingVoters: PendingVoter[] = [];
  displayedColumns = ['name', 'location', 'course'];

  ngOnInit(): void {}

  load(): void {
    this.loading = true;
    this.authService.getPendingVoters().subscribe({
      next: (data) => {
        this.pendingVoters = data;
        this.loading = false;
        this.loaded = true;
      },
      error: () => {
        this.notify.error('Error al cargar votantes pendientes');
        this.loading = false;
      }
    });
  }
}
