import { Component, EventEmitter, Input, Output } from '@angular/core';
import { project_inteface } from '../project.model';
import { ProjectDetails } from "../project-details/project-details";

@Component({
  selector: 'app-project-tab',
  imports: [ProjectDetails],
  templateUrl: './project_tab.html',
  styleUrl: './project_tab.css'
})


export class ProjectTab {

  @Input({required: true}) project! : project_inteface
  @Input({required:true}) selected!: boolean


  
  public isTabOpen = false

  @Output() select = new EventEmitter<string>();

  onSelectorProject() {
    this.select.emit(this.project.id) ;
  }

  onOpenTab(){
    this.isTabOpen = true
  }

  onCloseTab(){
    this.isTabOpen = false
  }


}
