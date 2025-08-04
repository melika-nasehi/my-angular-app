import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user/user';
import { Task } from "./task/task";
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask } from "./new-task/new-task";
import { new_task_interface } from './task/task.model';
import { TasksService } from './task/tasklist.service';



@Component({
  selector: 'app-tasklist',
  imports: [Task, NewTask],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})
export class TaskList {
   @Input({required:true}) name?:string
   @Input({required:true}) userId! : string
   isAddingNewTask = false

  constructor(private taskService : TasksService){}


   get selectedUserTask(){
    return this.taskService.getUserTask(this.userId)
   }

   onNewTask(){
    this.isAddingNewTask = true
   }

   onCloseNewTask(){
    this.isAddingNewTask = false
   }

}
