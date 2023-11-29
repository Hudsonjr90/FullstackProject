import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'tslib';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post('http://localhost:3001/login', { username, password });
  }

  register(username: string, password: string) {
    return this.http.post('http://localhost:3001/register', { username, password });
  }

  logout() {
    return this.http.get('http://localhost:3001/logout');
  }
}
