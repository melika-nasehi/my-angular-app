import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { new_task_interface } from '../task/task.model';
import { TasksService } from '../task/tasklist.service';
import { Api } from '../../services/api';
import { NgFor } from '@angular/common';
import { project_inteface } from '../../project/project.model';

 

@Component({
  selector: 'app-new-task',
  imports: [FormsModule, NgFor],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})

export class NewTask implements OnChanges{

  projects: project_inteface[] = [];  
  selectedProjectId!: string;

  @Input({required: true}) userID! : string
  @Input({required:true}) projectID! : string

  @Output() close = new EventEmitter<void>()
  //@Output() create = new EventEmitter<new_task_interface>()

  enteredTitle = ''
  enteredDate = ''
  entered_project_id = ''

  private taskService = inject(TasksService)


  loadProjects() {
  this.api.getProjects(this.userID).subscribe(projects => {
    this.projects = projects;
    // if(this.projects.length > 0) {
    //   this.entered_project_id = this.projects[0].id;
    // }
  });
}


  constructor(private api : Api) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Parent userId:', this.userID);
  if (changes['userID'] && this.userID) {
    this.loadProjects();
  }
}


  onCancel(){
    this.close.emit()
  }

  onSubmitForm(){
    console.log('userID:', this.userID);
    console.log('projectID:', this.projectID);

    this.taskService.AddNewTask({
        title : this.enteredTitle ,
        deadline : this.enteredDate ,
        project_id : this.entered_project_id
      } ,
    this.userID)

    this.close.emit()
  }
  
}
