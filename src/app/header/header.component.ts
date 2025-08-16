import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { NgIf } from "@angular/common";

@Component({
    selector :'app-header',
    standalone : true ,
    templateUrl : './header.component.html',
    styleUrl : './header.component.css',
    imports:[NgIf]

})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.username = user ? user.username : '';
    });
  }

  logout() {
    this.auth.logout();
  }
}