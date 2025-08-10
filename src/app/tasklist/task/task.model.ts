import { User } from "../../user/user"
import { ProjectTab } from "../../project/project_tab/project_tab"
import { user_interface } from "../../user/user.model"
import { project_inteface } from "../../project/project.model"

export interface task_interface {
  id : string
  title : string
  users : user_interface[]
  project : project_inteface
  completed : boolean
  deadline : string
  status : string //'CM' | 'IP' | 'NS'
  start_date : string
  completed_date : string
  
}

export interface new_task_interface {
  title : string
  deadline : string
}

