import { Injectable, OnInit } from "@angular/core"
import { DUMMY_TASKS } from "../../dummy-tasks"
import { new_task_interface, task_interface } from "./task.model"
import { DUMMY_USERS } from "../../dummy-users"
import { DUMMY_PROJECTS } from "../../dummy-projects"
import { Api } from "../../services/api"
import { profile_interface, user_interface } from "../../user/user.model"
import { project_inteface } from "../../project/project.model"
import { Observable, forkJoin, tap, map } from "rxjs"
import { TaskList } from "../tasklist"


@Injectable({ providedIn: "root" })
export class TasksService {


constructor(private api: Api){
}

backend_tasks: task_interface[] = [];
backend_users: user_interface[] = [];
backend_projects: project_inteface[] = [];

totalTasks: number = 0;
nextPageUrl: string | null = null;
prevPageUrl: string | null = null;
  
    // loadBackendData(): Observable<void> {
    
    // }


getUserTask(userId : string) {
    return this.backend_tasks.filter((task)=> task.users.some(user => user.id === userId))
}

AddNewTask(entered_task: new_task_interface, userId: string) {
  this.api.getUsers().subscribe({
    next: (users) => {
      this.backend_users = users;
      const founded_user = this.backend_users.find(user => user.id.toString() === userId);
      if (!founded_user) {
        console.error("User not found");
        return;
      }

      this.api.getProjects(userId).subscribe({
        next: (projects) => {
          this.backend_projects = projects;
          const founded_project = this.backend_projects.find(proj => proj.id.toString() === entered_task.project_id);
          if (!founded_project) {
            console.error("Project not found");
            return;
          }

          const newTaskPayload = {
            title: entered_task.title,
            status: "NS",
            start_date: new Date().toISOString().split('T')[0],
            deadline: entered_task.deadline,
            project: entered_task.project_id,
            users: [founded_user.id]
          };

          this.api.addNewTask(newTaskPayload).subscribe({
            next: (newTask) => {
              console.log("Task saved in backend:", newTask);
              this.backend_tasks.push(newTask);
            },
            error: (err) => {
              console.error("Error saving task:", err);
            }
          });
        },
        error: (err) => {
          console.error("Error loading projects:", err);
        }
      });
    },
    error: (err) => {
      console.error("Error loading users:", err);
    }
  });
}


completeTask(taskId : string){
    //console.log("salam")
    const task = DUMMY_TASKS.find((item) => item.id === taskId);
    if (task) task.completed = !task.completed;
} 

// sortTaskDeadline(user_id:string) {
//   console.log("salam khobi")
//   this.api.sortTaskDeadline(user_id).subscribe({
//     next: (sortedTasks) => {
//       this.backend_tasks = sortedTasks;
//       console.log('Sorted tasks:', sortedTasks);
//     },
//     error: (err) => {
//       console.error('Error sorting tasks:', err);
//     }
//   });
// }

sortTaskDeadline(user_id: string, page: number = 1) {
  this.api.sortTaskDeadline(user_id, page).subscribe({
    next: (response: any) => {
      this.backend_tasks = response.results;
      this.totalTasks = response.count;
      this.nextPageUrl = response.next;
      this.prevPageUrl = response.previous;
      console.log("Sorted tasks:", this.backend_tasks);
    },
    error: (err) => {
      console.error('Error sorting tasks:', err);
    }
  });
}


// getTasksForUser(user_id: string) {
//   this.api.getTasks(user_id).subscribe({
//     next: (tasks) => {
//       this.backend_tasks = tasks;
//       console.log("Tasks loaded:", tasks);
//     },
//     error: (err) => {
//       console.error("Error loading tasks:", err);
//     }
//   });
// }

getTasksForUser(user_id: string, page: number = 1) {
  this.api.getTasks(user_id, page).subscribe({
    next: (response: any) => {
      this.backend_tasks = response.results;
      this.totalTasks = response.count;
      this.nextPageUrl = response.next;
      this.prevPageUrl = response.previous;
      console.log("Tasks loaded:", this.backend_tasks);
    },
    error: (err) => {
      console.error("Error loading tasks:", err);
    }
  });
}



}