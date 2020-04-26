import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as humps from 'humps';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public jwtHelper: JwtHelperService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userService.authenticate(username, password).subscribe(
      result => {
        localStorage.setItem('token', result['access']);
        localStorage.setItem('refresh', result['refresh']);

        const jwtDecode = this.jwtHelper.decodeToken(result['access']);
        this.userService.getUserDetails(jwtDecode.user_id).subscribe(data => {
          const transformData = humps.camelizeKeys(data);
          if (transformData.isAdmin) {
            localStorage.setItem('role', 'admin');
            this.router.navigate(['/tournament']);
          } else if (transformData.isCoach) {
            localStorage.setItem('role', 'coach');
            this.router.navigate(['/tournament']);
          } else if (transformData.isPlayer) {
            localStorage.setItem('role', 'player');
            localStorage.setItem('player_id', jwtDecode.user_id);
            this.router.navigate(['/tournament']);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
          }
          console.log(data);
        });
      },

      error => {
        console.log('error');
      }
    );

  }
}
