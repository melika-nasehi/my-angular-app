import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { User } from "../../user/user";
import { ProjectTab } from "../../project/project_tab/project_tab";
import { ProjectDetails } from "../../project/project-details/project-details";
import { TaskList } from "../../tasklist/tasklist";
import { Api } from '../../services/api';
import { profile_interface, user_interface } from '../../user/user.model';
import { NewProject } from "../../project/new-project/new-project";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, User, ProjectTab, ProjectDetails, TaskList, NewProject],
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

  constructor(private auth: AuthService, private api:Api) {}

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.user = user;
    });

    this.api.getUsers().subscribe({
      next: (users) => {
        this.allUsers = users.results || users; // اگر paginated است
        console.log('All users loaded once:', this.allUsers);
      },
      error: (err) => {
        console.error('Failed to load users initially', err);
      }
    });

  }

  getSelectedProfile(){
    return this.backend_profile.find((prof) => prof.user_id === this.user.user_id);
  }

  showProjects(){
    this.isClickedProject = true
    console.log("user_id",this.user.user_id)
    this.api.getProjects(this.user.user_id).subscribe({
      next: (projects) => {
        this.backend_projects = projects;
        console.log('Projects for user:', this.backend_projects);
        this.selectedProjectId = this.backend_projects[0].id;
      },
      error: (err) => {
        console.error('Error loading projects:', err);
        this.backend_projects = [];
      }
    });
  }

  showTasks(){
    this.isClickedTask = true
    console.log("user_id",this.user.user_id)
    this.api.getTasks(this.user.user_id).subscribe({
      next: (tasks) => {
        this.backend_tasks = tasks;
        console.log('tasks for user:', this.backend_tasks);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.backend_tasks = [];
      }
    });
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

  onNewProject(){
    this.isAddingProject = true
  }

}