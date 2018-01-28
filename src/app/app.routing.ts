import { Routes, RouterModule } from '@angular/router';
import { VoteComponent } from './vote/vote.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
// import { RegisterComponent } from './register/index';
import { AuthGuard } from './guards/index';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'home' , component: HomeComponent , canActivate: [AuthGuard]},
    { path: 'vote' , component: VoteComponent, canActivate: [AuthGuard]},
    // otherwise redirect to login
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);