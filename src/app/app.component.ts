import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Basketball League Management System';
  showHeader = false;
  role;

  constructor(private route: ActivatedRoute,
              public router: Router,
              private userService: UserService) {
    this.showHeader = userService.isAuthenticateUser();
    this.role = localStorage.getItem('role');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    this.router.navigate(['/']);
  }

}
