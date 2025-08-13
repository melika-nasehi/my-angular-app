import { booleanAttribute, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../user/user';
import { Task } from "./task/task";
import { DUMMY_USERS } from '../dummy-users';
import { DUMMY_TASKS } from '../dummy-tasks';
import { NewTask } from "./new-task/new-task";
import { new_task_interface, task_interface } from './task/task.model';
import { TasksService } from './task/tasklist.service';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-tasklist',
  imports: [Task, NewTask, FormsModule],
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

  searchTerm: string = '';
  ordering:string=''

  onSearch() {
    this.currentPage = 1;
    this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
  }

  ngOnInit(): void {
      this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      console.log("User changed → Reload tasks");
      this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
    }
  }


   onNewTask(){
    this.isAddingNewTask = true
   }

   onCloseNewTask(){
    this.isAddingNewTask = false
   }

   onSortDeadline(){
    if (this.ordering === ''){
      this.ordering = 'deadline'
    }
    else if (this.ordering === 'deadline'){
      this.ordering = ''
    }
    this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
   }

   currentPage: number = 1;

goToNextPage() {
  if (this.taskService.nextPageUrl) {
    this.currentPage++;
    this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
  }
}

goToPrevPage() {
  if (this.taskService.prevPageUrl && this.currentPage > 1) {
    this.currentPage--;
    this.taskService.getTasksForUser(this.userId, this.currentPage, this.ordering, this.searchTerm);
  }
}


}
