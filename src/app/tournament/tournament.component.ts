import {Component, OnInit} from '@angular/core';
import {TournamentService} from '../services/tournament.service';
import * as humps from 'humps';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.css']
})
export class TournamentComponent implements OnInit {

  matchData = [];

  constructor(private tournamentService: TournamentService) {
  }

  ngOnInit(): void {
    this.getTournamentList();
  }

  getTournamentList() {
    this.tournamentService.getTournamentList().subscribe(data => {
      this.matchData = humps.camelizeKeys(data);
    });
  }

}
