import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  handle(req: HttpRequest<any>) {
    throw new Error('Method not implemented.');
  }
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Register new user
  signUp(user: User): Observable<any> {
    return this.http
      .post(`${this.endpoint}/register-user`, user)
      .pipe(catchError(this.handleError));
  }

  // Login user
  siginIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/signin`, user);
    // .subscribe((res) => {
    //   localStorage.setItem('access_token', res.token);
    //   this.getUserProfile(res._id).subscribe((res) => {
    //     this.currentUser = res;
    //     this.router.navigate(['/user-profile/' + res.msg._id]);
    //   });
    // });
  }

  // Get token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // Check loggin
  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    if (authToken == null) {
      return false;
    } else {
      return true;
    }
  }

  // Logout user
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['auth/signin']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
