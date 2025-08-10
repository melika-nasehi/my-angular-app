import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  id: string;
  username: string;
  token: string;
  role: string;  // admin یا user
}

@Injectable({providedIn: 'root'})
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', {username, password}).pipe(
      tap(user => {
        localStorage.setItem('token', user.token);
        this.currentUser.next(user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.next(null);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
