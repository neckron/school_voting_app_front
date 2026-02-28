import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CandidateService } from '../../core/services/candidate.service';
import { NotificationService } from '../../core/services/notification.service';
import { Candidate } from '../../core/models/candidate.model';
import { User } from '../../core/models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent implements OnInit {
  private candidateService = inject(CandidateService);
  private router = inject(Router);
  private notify = inject(NotificationService);
  private fb = inject(FormBuilder);

  currentUser!: User;
  readonly appTitle = environment.appTitle;
  personeros: Candidate[] = [];
  contrallors: Candidate[] = [];
  personeroChosen: Candidate | null = null;
  contrallorChosen: Candidate | null = null;
  submitting = false;

  personeroForm = this.fb.group({ selected: [false, Validators.requiredTrue] });
  contrallorForm = this.fb.group({ selected: [false, Validators.requiredTrue] });

  ngOnInit(): void {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored).user;
    }

    this.candidateService.getPersonero().subscribe({
      next: (data) => (this.personeros = data),
      error: () => this.notify.error('Error al cargar candidatos a Personero')
    });

    this.candidateService.getContrallor().subscribe({
      next: (data) => (this.contrallors = data),
      error: () => this.notify.error('Error al cargar candidatos a Contralor')
    });
  }

  selectPersonero(candidate: Candidate): void {
    this.personeroChosen = candidate;
    this.personeroForm.patchValue({ selected: true });
  }

  selectContrallor(candidate: Candidate): void {
    this.contrallorChosen = candidate;
    this.contrallorForm.patchValue({ selected: true });
  }

  confirmVote(): void {
    if (!this.personeroChosen || !this.contrallorChosen) return;
    this.submitting = true;

    this.candidateService.vote(this.personeroChosen._id, this.contrallorChosen._id).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/success']);
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message ?? 'Error al registrar el voto. Intente de nuevo.';
        this.notify.error(msg);
      }
    });
  }

  modifyVote(): void {
    this.personeroChosen = null;
    this.contrallorChosen = null;
    this.personeroForm.patchValue({ selected: false });
    this.contrallorForm.patchValue({ selected: false });
  }
}
