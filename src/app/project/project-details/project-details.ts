import { Component, Input } from '@angular/core';
import { project_inteface } from '../project.model';
import { DatePipe } from '@angular/common';
import { user_interface } from '../../user/user.model';
import { TaskList } from "../../tasklist/tasklist";

@Component({
  selector: 'app-project-details',
  imports: [DatePipe, TaskList],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css'
})
export class ProjectDetails {
   @Input({ required: true }) project!: project_inteface;
   @Input({required:true}) users!: user_interface[];

   
}
