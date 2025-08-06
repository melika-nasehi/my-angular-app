import { Component, signal, OnInit  } from '@angular/core';
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
import { AuthService } from './auth.service';
import { Api } from './services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, User, TaskList, Task, ProjectTab, ProjectDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('my-angular-app');
  users_dummy: user_interface[] = DUMMY_USERS ;
  tasks_dummy = DUMMY_TASKS ;
  profiles_dummy = DUMMY_PROFILES 
  project_dummy = DUMMY_PROJECTS
  selectedUserId !: string 
  selectedProjectId ! : string

  isTabOpen : boolean = false

  usersToShow: user_interface[] = [];

  //constructor(private authService: AuthService) {}

  constructor(private api: Api) { }

  backend_users: User[] = [];

  ngOnInit(): void {
    this.api.getUsers().subscribe(data => {
      this.backend_users = data;
    });
  }



//   ngOnInit() {
//   const currentUser = this.authService.getCurrentUser();

//   if (!currentUser) {
//     // اگر کاربر لاگین نشده، مثلاً لیست را خالی کن
//     this.usersToShow = [];
//     return;
//   }

//   if (this.authService.isAdmin()) {
//     // اگر ادمین است، همه کاربران را نشان بده
//     this.usersToShow = this.users_dummy;
//   } else {
//     // اگر کاربر عادی است، فقط خودش را نشان بده
//     this.usersToShow = this.users_dummy.filter(u => u.id === currentUser.id);
//     this.selectedUserId = currentUser.id;  // خودکار انتخاب شود
//     this.selectedProjectId = '';           // پروژه انتخاب شده را خالی کن
//   }
// }


  onSelectUser(id: string){
    //console.log("selected user id : " + id) ;
    this.selectedUserId = id
    this.selectedProjectId = ''
  }

  onSelectProject(id:string){
    this.selectedProjectId = id
  }

  get selectedProject(){
    return this.project_dummy.find((proj)=>proj.id === this.selectedProjectId)
  }

  get selectedUser(){
    return this.users_dummy.find((user) => (user.id.toString()) === this.selectedUserId)
  }

   getUserWithId(id?:string){
    return DUMMY_USERS.find((user)=> (user.id.toString()) === id) 
  }

  findUserProfile(user_id:string) {
    return this.profiles_dummy.find((profile)=> profile.user_id === user_id)
  }

  isUserInProject(projectUsers: any[]): boolean {
  return projectUsers.some(user => user.id === this.selectedUserId);
}

onOpenTab(){
    this.isTabOpen = true
  }

  onCloseTab(){
    this.isTabOpen = false
  }


}
