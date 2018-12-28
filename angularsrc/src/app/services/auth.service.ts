import { Injectable } from '@angular/core';
import { URLSearchParams , Http, Response, Headers} from '@angular/http';
import { map, filter, scan } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();
export function tokenGetter() {
  localStorage.getItem('id_token');
  return localStorage.getItem('id_token');
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) { }
  // http://localhost:3000/
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
    .post('users/register', user, {headers: headers})
    .pipe(
      map(res => res.json())
    );
  }

  getProfile(){
    // console.log("Getting profile");
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http
    .get('users/profile', {headers: headers})
    .pipe(
      map(res => res.json())
    );
  }

  addUserActivity(user, type, date, time){
    // console.log("Adding User Activity", date);
    const activity = {
      userId: user._id,
      activityType: type,
      date: date,
      time: time
    }
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http
    .post('users/activity/', activity, {headers: headers})
    .pipe(
      map(res => res.json())
    );
  }

  getUserActivities(user){
    // console.log("Getting all the user activities", user._id);
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http
    .get('users/activity/'+user._id, {headers: headers}).pipe(
      map(res => res.json()));
  }

  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
    .post('users/authenticate', user, {headers: headers})
    .pipe(
      map(res => res.json())
    );
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    // console.log(this.user);
    // console.log(this.user.permission);
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return !helper.isTokenExpired(tokenGetter());
  }

  adminAccess(){
    let user = JSON.parse(localStorage.getItem('user'))
    if (user != null){
      var permission = user["permission"]
      // console.log(user);
      // console.log(permission);
      return user["permission"] == "admin";
    }
    return false;
    
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getUsers(){
    // console.log("Getting all users");
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);
    return this.http
    .get('users/', {headers: headers}).pipe(
      map(res => res.json()));
  }
}
