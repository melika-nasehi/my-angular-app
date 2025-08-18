import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; 
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators'; 
import { Api } from '../services/api';
import { TasksService } from '../tasklist/task/tasklist.service';
import { Login } from '../pages/login/login';
import { user_interface } from '../user/user.model';
import { User } from '../user/user';
import { ProjectTab } from '../project/project_tab/project_tab';
import { ProjectDetails } from '../project/project-details/project-details';
import { TaskList } from '../tasklist/tasklist';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-admin-panel',
  standalone:true ,
  imports: [RouterOutlet, CommonModule, Login, NgIf, NgFor, User, ProjectTab, ProjectDetails, TaskList,], 
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})

export class AdminPanel implements OnInit {

  protected readonly title = signal('my-angular-app');
  selectedUserId!: string;
  selectedProjectId!: string;
  isTabOpen: boolean = false;
  usersToShow: user_interface[] = [];

  isAdminPanelOpen:boolean = false
  isAdmin: boolean = false;

  constructor(private api: Api, private taskService: TasksService, private router: Router, private auth : AuthService) {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)  
    ).subscribe(() => {
      this.isLoggedIn = !!localStorage.getItem('access');
    });
  }

  backend_users: user_interface[] = [];

  isLoggedIn: boolean = false;

  ngOnInit(): void {
  const token = localStorage.getItem('access');
  this.isLoggedIn = !!token;

  if (this.isLoggedIn) {
    this.auth.checkIsAdmin().subscribe((result) => {
      this.isAdmin = result;
      if (!this.isAdmin) {
        this.router.navigate(['/home']);
      }
    });
    this.api.getUsers().subscribe({
      next: (data) => {
        this.backend_users = data;
      },
      error: (err) => {
        console.error("Error loading users:", err);
      }
    });
  }
}



  backend_projects: any[] = [];
  backend_tasks: any[] = [];

  onSelectUser(id: string) {
    this.selectedUserId = id;

    this.api.getProjects(id).subscribe({
      next: (projects) => {
        this.backend_projects = projects;
        console.log('Projects for user:', projects);
        this.selectedProjectId = this.backend_projects[0].id;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.backend_projects = [];
      }
    });
  }

  onSelectProject(id: string) {
    this.selectedProjectId = id;
  }

  get selectedProject() {
    return this.backend_projects.find((proj) => proj.id === this.selectedProjectId);
  }

  get selectedUser() {
    return this.backend_users.find((user) => user.id.toString() === this.selectedUserId);
  }

  getUserWithId(id?: string) {
    return this.backend_users.find((user) => user.id.toString() === id);
  }

  isUserInProject(projectUsers: any[]): boolean {
    return projectUsers.some((user) => user.id === this.selectedUserId);
  }

  onOpenTab() {
    this.isTabOpen = true;
  }

  onCloseTab() {
    this.isTabOpen = false;
  }

  getProjectUsers(project: any) {
    return project.users.map((userId: string) => this.backend_users.find((user) => user.id === userId)).filter(Boolean);
  }

  onAdminPanel(){
    this.isAdminPanelOpen = true
  }

}

