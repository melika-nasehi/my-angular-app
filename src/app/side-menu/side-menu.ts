import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  imports: [],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css'
})
export class SideMenu {

  constructor(private router: Router){}


  goToHome(){
    this.router.navigate(['/home']) ;
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  onAdminPanel(){
    this.router.navigate(['/admin_panel'])
  }

  onProjects(){
    this.router.navigate(["/side-menu-projects"])
  }

  onTasks(){

  }

  onProfile(){

  }

  onSetting(){

  }

}
