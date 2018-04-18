import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map'; 
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers})
                    .map(res => res.json());
  } //registerUser

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers})
                    .map(res => res.json());
  } //authenticateUser

  getProfile() {
    let headers = new Headers();
    this.loadToken(); // grab token for aut header
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', { headers: headers})
                    .map(res => res.json());  
  } //getProfile

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  } //storeUserData

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  } //loadToken

  // check to see if we are logged in (actually to see if the token is not expired)
  loggedIn() {
    return tokenNotExpired('id_token');
  } //loggedIn

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  } //logout
}
