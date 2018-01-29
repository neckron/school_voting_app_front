import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// used to create fake backend
// &&import {fakeBackendProvider} from './_helpers/index';

import {AppComponent} from './app.component';
 import {routing} from './app.routing';

// import {AlertComponent} from './_directives/index';
 import {AuthGuard} from './guards/index';
import { HeaderComponent } from './header/header.component';
// import {JwtInterceptor} from './_helpers/index';
// import {AlertService, AuthenticationService, UserService} from './_services/index';
import {AuthService} from './services/auth.service';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { VoteComponent } from './vote/vote.component';
import { LogoutComponent } from './logout/logout.component';
import { CandidateService } from './services/candidate.service';
import { HttpModule} from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './services/alert.service';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    VoteComponent,
    LogoutComponent,
    AlertComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    CandidateService,
    AlertService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}