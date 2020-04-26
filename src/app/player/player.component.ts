import {Component, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {Player} from '../models/player';
import * as humps from 'humps';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  playerId: number;
  player: Player;

  constructor(private actRoute: ActivatedRoute, private teamService: TeamService) {
    this.playerId = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getPlayerDetail(this.playerId);
  }

  getPlayerDetail(id) {
    this.teamService.getPlayerDetails(id).subscribe(data => {
      this.player = humps.camelizeKeys(data);
    });
  }

}
