import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user/user';
import { Task } from "./task/task";
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask } from "./new-task/new-task";
import { new_task_interface, task_interface } from './task/task.model';
import { TasksService } from './task/tasklist.service';
import { Api } from '../services/api';



@Component({
  selector: 'app-tasklist',
  imports: [Task, NewTask],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})
export class TaskList{
   @Input({required:true}) name?:string
   @Input({required:true}) userId! : string
   @Input({required:true}) projectId! : string
   isAddingNewTask = false
  @Input() tasks!: any[]


  constructor(){}

  ngOnInit(): void {
    //task
        
  }

  
  //  get selectedUserTask(){
  //   return this.taskService.getUserTask(this.userId)
  //  }

  //  getUserTask(userId : string) {
  //   return this.backend_tasks.filter((task)=> task.users.some(user => user.id === userId))
  // }

   onNewTask(){
    this.isAddingNewTask = true
   }

   onCloseNewTask(){
    this.isAddingNewTask = false
   }

}
