import { booleanAttribute, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class TaskList implements OnInit,OnChanges{
   @Input({required:true}) name?:string
   @Input({required:true}) userId! : string
   @Input({required:true}) projectId! : string
   isAddingNewTask = false
  @Input() tasks!: any[]


  constructor(public taskService : TasksService){}

  

  ngOnInit(): void {
      this.taskService.getTasksForUser(this.userId);  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      console.log("User changed → Reload tasks");
      this.taskService.getTasksForUser(this.userId);
    }
  }


   onNewTask(){
    this.isAddingNewTask = true
   }

   onCloseNewTask(){
    this.isAddingNewTask = false
   }

   onSortDeadline(){
      this.taskService.sortTaskDeadline(this.userId)
   }

   currentPage: number = 1;

goToNextPage() {
  if (this.taskService.nextPageUrl) {
    this.currentPage++;
    this.taskService.getTasksForUser(this.userId, this.currentPage);
  }
}

goToPrevPage() {
  if (this.taskService.prevPageUrl && this.currentPage > 1) {
    this.currentPage--;
    this.taskService.getTasksForUser(this.userId, this.currentPage);
  }
}


}
