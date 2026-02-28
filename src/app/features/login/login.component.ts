import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private notify = inject(NotificationService);

  readonly appTitle = environment.appTitle;
  loading = false;

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const { username, password } = this.form.getRawValue();

    this.authService.login(username, password).subscribe({
      next: (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.loading = false;
        if (response.user.userrole === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (response.user.vote === true) {
          this.notify.info('Ya has votado anteriormente');
          this.authService.logout();
        } else {
          this.router.navigate(['/vote']);
        }
      },
      error: () => {
        this.loading = false;
        this.notify.error('Usuario o contraseña incorrectos');
      }
    });
  }
}
