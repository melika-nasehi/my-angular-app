import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../tasklist/task/tasklist.service';
import { Api } from '../../services/api';
import { NgFor } from '@angular/common';
import { project_inteface } from '../../project/project.model';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-new-project',
  imports: [FormsModule],
  templateUrl: './new-project.html',
  styleUrl: './new-project.css'
})
export class NewProject {

  @Input({required: true}) userID! : string
  @Output() close = new EventEmitter<void>()

  enteredTitle = ''
  enteredStartDate = ''
  enteredEndDate = ''
  entered_users = []

  private projectService = inject(ProjectService)

  constructor(private api : Api) {}

  ngOnChanges(changes: SimpleChanges): void {
}

  onCancel(){
    this.close.emit()
  }

  onSubmitForm(){
    console.log('userID:', this.userID);

    this.projectService.addNewProject(this.userID, 
      {title:this.enteredTitle ,
       startDate : this.enteredStartDate ,
       endDate : this.enteredEndDate,
      } )

    this.close.emit()
  }

}
