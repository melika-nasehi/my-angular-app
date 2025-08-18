import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../tasklist/task/tasklist.service';
import { Api } from '../../services/api';
import { NgFor } from '@angular/common';
import { project_inteface } from '../../project/project.model';

@Component({
  selector: 'app-new-project',
  imports: [FormsModule],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css'
})
export class NewProject {

  projects: project_inteface[] = [];  
  selectedProjectId!: string;

  @Input({required: true}) userID! : string

  @Output() close = new EventEmitter<void>()
  //@Output() create = new EventEmitter<new_task_interface>()

  enteredTitle = ''
  enteredStartDate = ''
  enteredEndDate = ''
  entered_users = []

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

    this.taskService.AddNewTask({
        title : this.enteredTitle ,
        deadline : this.enteredStartDate ,
        project_id : this.enteredEndDate
      } ,
    this.userID)

    this.close.emit()
  }

}
