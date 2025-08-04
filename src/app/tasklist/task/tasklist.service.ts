import { Injectable } from "@angular/core"
import { DUMMY_TASKS } from "../../dummy-tasks"
import { new_task_interface } from "./task.model"


@Injectable({ providedIn: "root" })
export class TasksService {

dummy_tasks = DUMMY_TASKS

constructor(){
    
}

getUserTask(userId : string) {
    return this.dummy_tasks.filter((task)=> task.user_id === userId)
}

AddNewTask(enetered_task : new_task_interface , userId : string){
    this.dummy_tasks.push({
      id: 'newTask_' + new Date().getTime().toString(),
      user_id: userId ,
      title: enetered_task.title ,
      completed : false ,
      deadline : enetered_task.deadline,
    })
   }

completeTask(taskId : string){
    //console.log("salam")
    const task = DUMMY_TASKS.find((item) => item.id === taskId);
    if (task) task.completed = !task.completed;
}   

}