import { User } from "../user/user"
import { user_interface } from "../user/user.model"

export interface project_inteface {
    id : string
    title : string
    users: user_interface[]
    access : string //'PB' | 'PV'
    category : string //'PR' | 'WR' | 'TM'
    is_archived : boolean
    startDate : string
    endDate :string
    theme :string

}

export interface new_project_interface{
    title: string
    startDate : string
    endDate : string
}