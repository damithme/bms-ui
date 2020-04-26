import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  role;
  playerId;

  constructor(public router: Router) {
    this.role = localStorage.getItem('role');
    if (this.role === 'player') {
      this.playerId = localStorage.getItem('player_id');
    }
  }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate(['/tournament']);
  }

  goToTeams() {
    this.router.navigate(['/team']);
  }

  goToSiteStat() {
    this.router.navigate(['/user']);
  }

  goToPlayerProfile() {
    this.router.navigate(['/player/' + this.playerId]);
  }
}
