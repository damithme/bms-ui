import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import {LoginComponent} from './login/login.component';
import {TournamentComponent} from './tournament/tournament.component';
import {UserComponent} from './user/user.component';
import {TeamComponent} from './team/team.component';
import {PlayerComponent} from './player/player.component';
import {TeamDetailComponent} from './team/team-detail/team-detail.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'tournament', component: TournamentComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'team', component: TeamComponent, canActivate: [AuthGuard]},
  {path: 'team/:id', component: TeamDetailComponent, canActivate: [AuthGuard]},
  {path: 'player/:id', component: PlayerComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
