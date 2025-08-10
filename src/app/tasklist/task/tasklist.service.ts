import { Injectable, OnInit } from "@angular/core"
import { DUMMY_TASKS } from "../../dummy-tasks"
import { new_task_interface, task_interface } from "./task.model"
import { DUMMY_USERS } from "../../dummy-users"
import { DUMMY_PROJECTS } from "../../dummy-projects"
import { Api } from "../../services/api"
import { profile_interface, user_interface } from "../../user/user.model"
import { project_inteface } from "../../project/project.model"
import { Observable, forkJoin, tap, map } from "rxjs"


@Injectable({ providedIn: "root" })
export class TasksService {


constructor(private api: Api){
}

backend_tasks: task_interface[] = [];
backend_users: user_interface[] = [];
backend_projects: project_inteface[] = [];
  
    // loadBackendData(): Observable<void> {
    
    // }


getUserTask(userId : string) {
    return this.backend_tasks.filter((task)=> task.users.some(user => user.id === userId))
}

AddNewTask(entered_task: new_task_interface, userId: string, projectID: string) {
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
          const founded_project = this.backend_projects.find(proj => proj.id.toString() === projectID);
          if (!founded_project) {
            console.error("Project not found");
            return;
          }

          const newTaskPayload = {
            title: entered_task.title,
            status: "NS",
            start_date: new Date().toISOString().split('T')[0],
            deadline: entered_task.deadline,
            project: founded_project.id,
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

}