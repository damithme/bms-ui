import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tournament} from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  readonly APIUrl = 'tournaments';

  constructor(private http: HttpClient) {
  }

  getTournamentList(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(this.APIUrl);
  }
}
