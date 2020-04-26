import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public token: string;
  readonly tokenApiUrl = 'token/';
  readonly loginApiUrl = 'logins';
  readonly userApiUrl = 'users';

  private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      alert(error.error.non_field_errors);

    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  authenticate(username: string, password: string) {
    const data = {'username': username, 'password': password};
    return this.http.post(this.tokenApiUrl, data, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }

  isAuthenticateUser() {
    const user = localStorage.getItem('token');
    if (user != null) {
      return true;
    }
    return false;
  }

  getUserStats(): Observable<User[]> {
    return this.http.get<User[]>(this.loginApiUrl);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }

  getUserDetails(id: number): Observable<User> {
    return this.http.get<User>(this.userApiUrl + '/' + id);
  }
}
