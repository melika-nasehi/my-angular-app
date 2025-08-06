import { Component, computed, Input, input, Output, EventEmitter, output } from '@angular/core';
import {DUMMY_USERS} from '../dummy-users' ;
import { user_interface , profile_interface} from './user.model'
import { DUMMY_PROFILES } from '../dummy_profiles';


@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

  @Input({required: true}) user! : user_interface
  //@Input({required: true}) profile? : profile_interface
  @Input({required:true}) selected!: boolean 

  @Output() select = new EventEmitter<string>();
  

  // get imagePath(){
  //   return '/users_pic/' + this.profile?.avatar
  // }

  onSelectorUser() {
    this.select.emit(this.user.id) ;
  }

}
