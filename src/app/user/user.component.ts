import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import * as humps from 'humps';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['username', 'first_name', 'last_name', 'no_of_logins', 'total_time_spent', 'is_online'];
  dataSource = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getTournamentList();
  }

  getTournamentList() {
    this.userService.getUserStats().subscribe(data => {
      this.dataSource = humps.camelizeKeys(data);
    });

  }
}
