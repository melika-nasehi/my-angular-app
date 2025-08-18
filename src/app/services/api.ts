import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { task_interface } from '../tasklist/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private BASE_URL = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<any> {
  //   return this.http.get(this.BASE_URL + 'users/users_list/');
  // }

  getUsers(): Observable<any> {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({  'Authorization': `Bearer ${token}`  });
    return this.http.get(this.BASE_URL + 'users/users_list/', { headers: headers });
  }

  getProjects(user_id:string): Observable<any> {
    return this.http.get(`${this.BASE_URL}projects/project_of_user/${user_id}/`);
  }

  getTasks(user_id: string, page:number=1, ordering:string='', search:string=''): Observable<any> {
    // return this.http.get(this.BASE_URL + 'tasks/task_list/');
    return this.http.get(`${this.BASE_URL}tasks/tasks/?user_id=${user_id}&page=${page}&ordering=${ordering}&search=${search}`);
  }


  addNewTask(taskData: any): Observable<any> {
    const token = localStorage.getItem('access');
    return this.http.post(this.BASE_URL + "tasks/tasks/", taskData , {headers:{Authorization: `Bearer ${token}`}});
}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}users/token/`, {username,password} );
  }

  sortTaskDeadline(user_id: string, page: number) : Observable<any>{
    return this.http.get(`${this.BASE_URL}users/sort_task_deadline/${user_id}/?page=${page}`)
  }

  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('access');
    console.log('token:',token)
    return this.http.get(`${this.BASE_URL}users/profile/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  toggleCompleted(task_id:string){
    const token = localStorage.getItem('access');
    return this.http.post(`${this.BASE_URL}tasks/toggle_completed/${task_id}/`,{}, {headers:{Authorization: `Bearer ${token}`}});
  }


}
