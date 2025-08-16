import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; 
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators'; 
import { Api } from './services/api';
import { TasksService } from './tasklist/task/tasklist.service';
import { Login } from "./pages/login/login";
import { user_interface } from './user/user.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Login, NgIf, NgFor], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  protected readonly title = signal('my-angular-app');
  selectedUserId!: string;
  selectedProjectId!: string;
  isTabOpen: boolean = false;

  usersToShow: user_interface[] = [];

  constructor(private api: Api, private taskService: TasksService, private router: Router) {
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
      this.router.navigate(['/home']);
      this.api.getUsers().subscribe({
        next: (data) => {
          console.log("Data from backend:", data);
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
}
