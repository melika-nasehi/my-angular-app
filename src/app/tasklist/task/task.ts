import { Component, inject, Input, Output } from '@angular/core';
import { task_interface } from './task.model';
import { DatePipe } from '@angular/common';
import { TasksService } from './tasklist.service';


@Component({
  selector: 'app-task',
  standalone : true ,
  imports: [DatePipe],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

  @Input ({required:true}) task! : task_interface

  private taskservice = inject(TasksService)

  onCompleteTask(){
    return this.taskservice.completeTask(this.task.id)
   }


}
