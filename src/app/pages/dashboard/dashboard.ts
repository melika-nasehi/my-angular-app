import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { User } from "../../user/user";
import { ProjectTab } from "../../project/project_tab/project_tab";
import { ProjectDetails } from "../../project/project-details/project-details";
import { TaskList } from "../../tasklist/tasklist";
import { Api } from '../../services/api';
import { profile_interface, user_interface } from '../../user/user.model';
import { NewProject } from "../../project/new-project/new-project";
import { SideMenu } from "../../side-menu/side-menu";
import { HeaderComponent } from "../../header/header.component";
import { ProjectService } from '../../project/project.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, User, ProjectTab, ProjectDetails, TaskList, NewProject, SideMenu, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  backend_profile: profile_interface[] = [];
  backend_projects: any[] = [];
  backend_tasks: any[] = [];
  backend_users: user_interface[] = [];
  selectedProjectId!: string;
  foundedProfile! : profile_interface 
  user : any = null
  isClickedProject : boolean = false
  isClickedTask : boolean = false
  isAddingProject :boolean = false
  allUsers: user_interface[] = [];

  activeView: 'projects' | 'tasks' | 'none' = 'none';

  constructor(private auth: AuthService, private api: Api) {}
  private projectService = inject(ProjectService)

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });

    this.api.getUsers().subscribe({
      next: (users) => {
        this.allUsers = users.results || users;
      },
      error: (err) => {
        console.error('Failed to load users initially', err);
      }
    });

    this.projectService.projectsUpdated.subscribe((newProject)=>{
      this.backend_projects.push(newProject)
    })
  }

  showProjects() {
    this.activeView = 'projects';
    
    if (this.user?.user_id) {
      this.api.getProjects(this.user.user_id).subscribe({
        next: (projects) => {
          this.backend_projects = projects.results || projects; 
          if (this.backend_projects.length > 0) {
            this.selectedProjectId = this.backend_projects[0].id;
          } else {
            this.selectedProjectId = '';
          }
        },
        error: (err) => {
          console.error('Error loading projects:', err);
          this.backend_projects = [];
        }
      });
    }
  }

  showTasks() {
    this.activeView = 'tasks';

    if (this.user?.user_id) {
      console.log('Task view is now active.');
    }
  }

  onSelectProject(id: string) {
    this.selectedProjectId = id;
  }

  get selectedProject() {
    return this.backend_projects.find((proj) => proj.id === this.selectedProjectId);
  }
  
  getProjectUsers(project: any): user_interface[] {
    if (!project || !project.users || !this.allUsers.length) {
      return [];
    }
    return project.users.map((userId: any) => 
      this.allUsers.find((user) => user.id.toString() === userId.toString())
    ).filter(Boolean);
  }

  onNewProject() {
    this.isAddingProject = true;
  }
}
