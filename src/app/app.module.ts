import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthGuardService} from './auth/auth-guard.service';
import {AuthService} from './auth/auth.service';
import {TournamentComponent} from './tournament/tournament.component';
import {TournamentService} from './services/tournament.service';
import {LoginComponent} from './login/login.component';
import {UserService} from './services/user.service';
import {JwtInterceptor} from './helpers/JwtInterceptor';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {UserComponent} from './user/user.component';
import {BaseUrlInterceptor} from './helpers/BaseUrlInterceptor';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TeamComponent} from './team/team.component';
import {PlayerComponent} from './player/player.component';
import {TeamDetailComponent} from './team/team-detail/team-detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {HeaderComponent} from './header/header.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TournamentComponent,
    LoginComponent,
    UserComponent,
    TeamComponent,
    PlayerComponent,
    TeamDetailComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule
  ],
  providers: [
    {provide: 'BASE_API_URL', useValue: 'http://127.0.0.1:8000/api'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
    AuthGuardService,
    AuthService,
    UserService,
    TournamentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
