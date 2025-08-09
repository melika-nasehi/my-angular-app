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
    return this.http.get(this.BASE_URL + 'users/users_list/');
  }

  getProjects(user_id:string): Observable<any> {
    return this.http.get(`${this.BASE_URL}projects/project_of_user/${user_id}/`);
  }

  getTasks(): Observable<any> {
    return this.http.get(this.BASE_URL + 'tasks/');
  }

      //login
}
