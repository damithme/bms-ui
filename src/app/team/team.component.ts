import {Component, OnInit} from '@angular/core';
import {TeamService} from '../services/team.service';
import * as humps from 'humps';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  displayedColumns: string[] = ['name', 'coach.name', 'avg'];
  dataSource = [];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.getTeamList();
  }

  getTeamList() {
    this.teamService.getTeamList().subscribe(data => {
      this.dataSource = humps.camelizeKeys(data);
    });
  }

}
