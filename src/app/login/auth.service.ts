import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private authenticatedUser$ = new Subject<boolean>();

  // private showMenuEmitter$  = new Subject<boolean>();


  constructor(
    private router: Router,
    private http: HttpClient
    ) {}

   async authenticateUser(user: any): Promise<any> {
    const result = await this.http.post<any>(`${environment.API}/auth/login`, user.value).toPromise();
    if (result && result.access_token) {
      window.localStorage.setItem('token', result.access_token);
      return true;
    }else{
      return false;
    }
  }

  getAuthorizationToken(): any{
    const token = window.localStorage.getItem('token');
    return token;
  }
  getTypeUser(): any {
    const decodedToken: any = jwt_decode(this.getAuthorizationToken())
    return decodedToken
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token: string): boolean {
    if (!token) { return true; }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined){return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(){
    const token =  this.getAuthorizationToken();
    if (!token) {
      return false;
    }else if (this.isTokenExpired(token)){
      return false;
    }
    return true
  }
}
