import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../user/user';
import { Task } from "../task/task";
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';



@Component({
  selector: 'app-tasklist',
  imports: [Task],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css'
})
export class TaskList {
   @Input({required:true}) name?:string
   @Input({required:true}) userId? : string

   dummy_tasks = DUMMY_TASKS 


   get selectedUserTask(){
    return this.dummy_tasks.filter((task)=> task.user_id === this.userId)
   }

   onCompleteTask(id: string){
    //console.log("salam")
    const task = DUMMY_TASKS.find((item) => item.id === id);
    if (task) task.completed = !task.completed;

    
    

   }

}
