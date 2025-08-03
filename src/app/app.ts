import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { User } from "./user/user";
import {DUMMY_USERS} from './dummy-users' ;
import { TaskList } from "./tasklist/tasklist";
import { DUMMY_TASKS } from './dummy-tasks';
import {NgFor, NgIf} from '@angular/common'
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, User, TaskList,Task],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
  users_dummy = DUMMY_USERS ;
  tasks_dummy = DUMMY_TASKS ;
  selectedUserId ? : string ;

  get selectedUserTasks() {
    return this.tasks_dummy.filter((task) => task.user_id === this.selectedUserId) 
  }

  onSelectUser(id: string){
    //console.log("selected user id : " + id) ;
    this.selectedUserId = id
  }

  get selectedUser(){
    return this.users_dummy.find((user) => user.id === this.selectedUserId)
  }

   getUserWithId(id?:string){
    return DUMMY_USERS.find((user)=> user.id === id) 
  }

}
