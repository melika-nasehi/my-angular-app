import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { new_task_interface } from '../task/task.model';
import { TasksService } from '../task/tasklist.service';
 

@Component({
  selector: 'app-new-task',
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})

export class NewTask {
  @Input({required: true}) userID! : string
  @Input({required:true}) projectID! : string

  @Output() close = new EventEmitter<void>()
  //@Output() create = new EventEmitter<new_task_interface>()

  enteredTitle = ''
  enteredDate = ''

  private taskService = inject(TasksService)

  onCancel(){
    this.close.emit()
  }

  onSubmitForm(){
    this.taskService.AddNewTask({
        title : this.enteredTitle ,
        deadline : this.enteredDate ,
      } ,
    this.userID,
    this.projectID)

    this.close.emit()
  }
  
}
