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
  

AddNewTask(entered_task: new_task_interface, userId: string) {
  this.api.getUsers().subscribe({
    next: (users) => {
      this.backend_users = users;
      const founded_user = this.backend_users.find(user => user.id === userId);
      if (!founded_user) {
        console.error("User not found");
        return;
      }

      this.api.getProjects(userId).subscribe({
        next: (projects) => {
          this.backend_projects = projects;
          const founded_project = this.backend_projects.find(proj => proj.id.toString() === entered_task.project_id.toString());
          console.log("test",founded_project)
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
          console.log("new",newTaskPayload)

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



completeTask(taskId: string) {
  this.api.toggleCompleted(taskId).subscribe({
    next: (response) => {
      console.log('Task toggled successfully in backend:', response);
      
      const taskIndex = this.backend_tasks.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        this.backend_tasks[taskIndex].is_completed = !this.backend_tasks[taskIndex].is_completed;
      }
    },
    error: (err) => {
      console.error('Error toggling task:', err);
    }
  });
}


getTasksForUser(user_id: string, page: number = 1, ordering:string='', search:string='') {
  console.log("this works")
  this.api.getTasks(user_id, page, ordering, search).subscribe({
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


  findUpcomingTasks(user_id:string){
          return this.api.getTasks2(user_id)
  }


}