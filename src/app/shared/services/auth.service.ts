import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  get token(): string {
    return '';
  }
  // private _token: string;

  constructor(private http: HttpClient  ) {

  }

  login(user: User): Observable<User> {
    return this.http.post('', user) as Observable<User>;
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(value: string) {

  }
}
