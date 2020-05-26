import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FbAuthResponse, User } from '../interfaces';

import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {
  get token(): string | null {
    const expiredDate = localStorage.getItem('fb-token-exp');
    if (expiredDate && (Date.now() > new Date(expiredDate).getTime())) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  // private _token: string;

  constructor(private http: HttpClient) {

  }

  login(user: User) {
    user.returnSecureToken = true;

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${ environment.apiKey }`, user)
      .pipe(
        tap((response) => this.setToken(response as FbAuthResponse))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null) {
    if (response) {
      localStorage.setItem('fb-token', response.idToken);

      if (response.expiresIn) {
        const currentTime = new Date().getTime();
        const expiredDate = new Date(currentTime + +response.expiresIn * 1000);
        localStorage.setItem('fb-token-exp', expiredDate.toString());
      }
    } else {
      localStorage.clear();
    }

  }
}
