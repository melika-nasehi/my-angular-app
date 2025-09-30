import { Component, Input } from '@angular/core';
import { project_inteface } from '../project.model';
import { AuthService } from '../../auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-recent-projects',
  imports: [],
  templateUrl: './recent-projects.html',
  styleUrl: './recent-projects.css'
})
export class RecentProjects {
  user_id : string = ''
  backend_projects: project_inteface[] = []
  selected_projects: project_inteface[] =[]

  constructor(private auth : AuthService, private projectService : ProjectService){}

  ngOnInit(){
    this.auth.currentUser.subscribe(user => {
      this.user_id = user? user.user_id : ''

      if (this.user_id){
        this.projectService.findRecentProjects(this.user_id).subscribe({
          next: (projects) => {
          this.backend_projects = projects;
          this.selected_projects = [...projects]
            .sort((a, b) => Number(b.id) - Number(a.id))
            .slice(0, 3);
          console.log("wanted projects:", this.selected_projects);
          }
        })
      }
    })
  }

}
