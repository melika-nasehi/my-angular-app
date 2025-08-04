import { Component, EventEmitter, Input, Output } from '@angular/core';
import {DUMMY_TASKS} from '../../dummy-tasks'
import { DUMMY_USERS } from '../../dummy-users';
import { task_interface } from './task.model';


@Component({
  selector: 'app-task',
  standalone : true ,
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {

  @Input ({required:true}) task! : task_interface
  @Output() complete = new EventEmitter<string>()

  onCompleteTask(){
    this.complete.emit(this.task.id)
  }


}
