import { Injectable } from "@angular/core"
import { DUMMY_TASKS } from "../../dummy-tasks"
import { new_task_interface } from "./task.model"
import { DUMMY_USERS } from "../../dummy-users"
import { DUMMY_PROJECTS } from "../../dummy-projects"


@Injectable({ providedIn: "root" })
export class TasksService {

dummy_tasks = DUMMY_TASKS
dummy_users = DUMMY_USERS
dummy_projects = DUMMY_PROJECTS

constructor(){
    
}

// getUserTask(userId : string) {
//     return this.dummy_tasks.filter((task)=> task.users.some(user => user.id === userId))
// }

AddNewTask(enetered_task : new_task_interface , userId : string, projectID:string){

    const founded_user = this.dummy_users.find((user)=> user.id === userId )
    const founded_project = this.dummy_projects.find((proj)=> proj.id === projectID )
    if (!founded_user || !founded_project)
        return

    this.dummy_tasks.push({
      id: 'newTask_' + new Date().getTime().toString(),
      title: enetered_task.title ,
      users: [founded_user],
      project : founded_project,
      completed : false ,
      deadline : enetered_task.deadline,
      status : 'NS',
      start_date: new Date().getDate().toString(),
      completed_date : '',
    })
   }

completeTask(taskId : string){
    //console.log("salam")
    const task = DUMMY_TASKS.find((item) => item.id === taskId);
    if (task) task.completed = !task.completed;
}   

}