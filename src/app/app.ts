import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { User } from "./user/user";
import {DUMMY_USERS} from './dummy-users' ;
import { Task } from "./task/task";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, User, Task],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
  users = DUMMY_USERS ;

  onSelectUser(id: string){
    console.log("selected user id : " + id) ;
  }
}
