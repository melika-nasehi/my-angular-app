import { Injectable } from "@angular/core";
import { new_project_interface, project_inteface } from "./project.model";
import { Api } from "../services/api";
import { Subject } from "rxjs";

@Injectable({providedIn:"root"})
export class ProjectService{

    constructor(private api : Api){}
    projectsUpdated = new Subject<project_inteface>()
    wanted_projects:project_inteface[] = []
    
    addNewProject(userId: string , entered_project : new_project_interface){

        const new_project_payload = {
            title : entered_project.title ,
            startDate : entered_project.startDate ,
            endDate : entered_project.endDate ,
            users : [userId]
        }

        this.api.addNewProject(new_project_payload).subscribe({
            next : (new_proj) => {
                console.log("project saved in backend :" , new_proj)
                this.projectsUpdated.next(new_proj)
            },
            error: (err)=> console.log("error saving project in backend")
        })

    }

    findRecentProjects(user_id:string){
        return this.api.getProjects(user_id)
    }


}