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

  getTasks(user_id: string): Observable<any> {
    // return this.http.get(this.BASE_URL + 'tasks/task_list/');
    return this.http.get(`${this.BASE_URL}tasks/task_of_user/${user_id}/`);
  }


  addNewTask(taskData: any): Observable<any> {
  return this.http.post(this.BASE_URL + "tasks/task_list/", taskData);
}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}users/token/`, {username,password} );
  }

}
