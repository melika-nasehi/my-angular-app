import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.BASE_URL + 'users/');
  }

  getProjects(): Observable<any> {
    return this.http.get(this.BASE_URL + 'projects/');
  }

  getTasks(): Observable<any> {
    return this.http.get(this.BASE_URL + 'tasks/');
  }

      //login
}
