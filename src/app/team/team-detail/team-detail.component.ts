import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeamService} from '../../services/team.service';
import * as humps from 'humps';
import * as _ from 'lodash';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {

  teamId: number;
  displayedColumns: string[] = ['name', 'height', 'playerAvgScore'];
  dataSource = [];
  role;

  constructor(private actRoute: ActivatedRoute, private teamService: TeamService) {
    this.teamId = this.actRoute.snapshot.params.id;
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
    this.getTeamDetails(this.teamId);
  }

  onChange(event) {
    if (event.checked) {
      this.get90thPercentileTeamDetails(this.teamId);
    } else {
      this.getTeamDetails(this.teamId);
    }
  }

  getTeamDetails(id: number) {
    this.teamService.getPlayers(id).subscribe(data => {
      this.dataSource = humps.camelizeKeys(data);
    });
  }

  get90thPercentileTeamDetails(id: number) {
    this.teamService.getPlayers(id).subscribe(data => {
      const players = humps.camelizeKeys(data);
      const sortedPlayers = _.sortBy(players, o => o.playerAvgScore).reverse();
      const noOfPlayers = sortedPlayers.length;
      const top90thPercentile = (noOfPlayers - (noOfPlayers * 0.9));
      this.dataSource = _.slice(sortedPlayers, 0, top90thPercentile);
    });
  }

}
