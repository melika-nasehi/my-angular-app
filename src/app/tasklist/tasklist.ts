import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user/user';
import { Task } from "./task/task";
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask } from "./new-task/new-task";
import { new_task_interface } from './task/task.model';



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

   dummy_tasks = DUMMY_TASKS 


   get selectedUserTask(){
    return this.dummy_tasks.filter((task)=> task.user_id === this.userId)
   }

   onCompleteTask(id: string){
    //console.log("salam")
    const task = DUMMY_TASKS.find((item) => item.id === id);
    if (task) task.completed = !task.completed;
   }

   onNewTask(){
    this.isAddingNewTask = true
   }

   onCancelNewTask(){
    this.isAddingNewTask = false
   }

   onAddNewTask(enetered_task : new_task_interface){
    this.dummy_tasks.push({
      id: 'newTask_' + new Date().getTime().toString(),
      user_id: this.userId ,
      title: enetered_task.title ,
      completed : false ,
      deadline : enetered_task.deadline,
    })
    this.isAddingNewTask = false
   }

}
