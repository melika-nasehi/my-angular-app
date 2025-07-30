import { Component, computed, Input, input, Output, EventEmitter, output } from '@angular/core';
import {DUMMY_USERS} from '../dummy-users' ;

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {

  @Input({required: true}) avatar! : string ;
  @Input({required: true}) name! : string ;
  @Input({required: true}) id! : string ;

  @Output() select = new EventEmitter<string>();
  

  get imagePath(){
    return '/users_pic/' + this.avatar
  }

  onSelectorUser() {
    this.select.emit(this.id) ;
  }

}
