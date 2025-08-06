import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { User } from "./user/user";
import {DUMMY_USERS} from './dummy-users' ;
import { TaskList } from "./tasklist/tasklist";
import { DUMMY_TASKS } from './dummy-tasks';
import {NgFor, NgIf} from '@angular/common'
import { Task } from './tasklist/task/task';
import { DUMMY_PROFILES } from './dummy_profiles';
import { profile_interface, user_interface } from './user/user.model';
import { DUMMY_PROJECTS } from './dummy-projects';
import { ProjectTab } from "./project/project_tab/project_tab";
import { ProjectDetails } from "./project/project-details/project-details";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, User, TaskList, Task, ProjectTab, ProjectDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
  users_dummy: user_interface[] = DUMMY_USERS ;
  tasks_dummy = DUMMY_TASKS ;
  profiles_dummy = DUMMY_PROFILES 
  project_dummy = DUMMY_PROJECTS
  selectedUserId !: string 
  selectedProjectId ! : string

  // get selectedUserTasks() {
  //   return this.tasks_dummy.filter((task) => task.user_id === this.selectedUserId) 
  // }

  onSelectUser(id: string){
    //console.log("selected user id : " + id) ;
    this.selectedUserId = id
  }

  onSelectProject(id:string){
    this.selectedProjectId = id
  }

  get selectedProject(){
    return this.project_dummy.find((proj)=>proj.id === this.selectedProjectId)
  }

  get selectedUser(){
    return this.users_dummy.find((user) => user.id === this.selectedUserId)
  }

   getUserWithId(id?:string){
    return DUMMY_USERS.find((user)=> user.id === id) 
  }

  findUserProfile(user_id:string) {
    return this.profiles_dummy.find((profile)=> profile.user_id === user_id)
  }

  isUserInProject(projectUsers: any[]): boolean {
  return projectUsers.some(user => user.id === this.selectedUserId);
}


}
