import { Component } from '@angular/core';
import { task_interface } from '../task.model';
import { AuthService } from '../../../auth.service';
import { ProjectService } from '../../../project/project.service';
import { TasksService } from '../tasklist.service';

@Component({
  selector: 'app-upcoming-tasks',
  imports: [],
  templateUrl: './upcoming-tasks.html',
  styleUrl: './upcoming-tasks.css',
})
export class UpcomingTasks {
  user_id : string = ''
  selected_tasks : task_interface[] = []
  backend_tasks : task_interface[] = []
  now = new Date().toISOString().split('T')[0]

  constructor(private auth : AuthService,private taskService : TasksService ){
  }
  
    ngOnInit(){
      this.auth.currentUser.subscribe(user => {
        this.user_id = user? user.user_id : ''
  
        if (this.user_id){
          this.taskService.findUpcomingTasks(this.user_id).subscribe({
            next: (tasks) => {
            this.backend_tasks = tasks;
            this.selected_tasks = [...tasks]
              .sort((a, b) => Number(a.id) - Number(b.id))
              .filter(tasks=> tasks.deadline >= this.now)
              .slice(0, 3) ;
            console.log("wanted tasks:", this.selected_tasks, " now date: ",this.now);
            }
          })
        }
      })
    }
}
