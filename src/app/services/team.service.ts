import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/team';
import {Player} from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  readonly teamApiUrl = 'teams';
  readonly playerApiUrl = 'players';

  constructor(private http: HttpClient) {
  }

  getTeamList(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamApiUrl);
  }

  getPlayers(id): Observable<Player[]> {
    return this.http.get<Player[]>(this.teamApiUrl + '/' + id);
  }

  getPlayerDetails(id): Observable<Player> {
    return this.http.get<Player>(this.playerApiUrl + '/' + id);
  }
}
