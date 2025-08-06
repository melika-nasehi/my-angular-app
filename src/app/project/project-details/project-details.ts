import { Component, Input } from '@angular/core';
import { project_inteface } from '../project.model';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails {
   @Input({ required: true }) project!: project_inteface;
}
