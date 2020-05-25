import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FbAuthResponse, User } from '../interfaces';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  get token(): string {
    return '';
  }

  // private _token: string;

  constructor(private http: HttpClient) {

  }

  login(user: User): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: any) {
    console.log(response);
  }
}
