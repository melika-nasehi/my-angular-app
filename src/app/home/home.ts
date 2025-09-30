import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Api } from '../services/api';
import { AuthService } from '../auth.service';
import { user_interface } from '../user/user.model';
import { RouterLink } from '@angular/router';
import { Calender } from '../calender/calender';
import { SideMenu } from "../side-menu/side-menu";
import { RecentProjects } from "../project/recent-projects/recent-projects";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NgIf, RouterLink, Calender, SideMenu, RecentProjects],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  isLoggedIn: boolean = !!localStorage.getItem('access');
  isAdmin: boolean = false;
  backend_users: user_interface[] = [];

  constructor(private router: Router,private api:Api, private auth:AuthService) {}

  username: string = '';

  meetings = {
    '2025-09-22' : ['final exam' , 'project deadline']
  }

  
  ngOnInit(): void {
  const token = localStorage.getItem('access');
  this.isLoggedIn = !!token;

  
  if (this.isLoggedIn) {
    this.auth.checkIsAdmin().subscribe((result) => {
      this.isAdmin = result;
    });
  }
  
  this.auth.currentUser.subscribe(user => {
      this.username = user ? user.username : '';
    });
    
}


  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

   onAdminPanel(){
    this.router.navigate(['/admin_panel'])
  }

  onProjects(){

  }

  onTasks(){

  }

  onProfile(){

  }

  onSetting(){

  }
}
