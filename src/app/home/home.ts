import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, NgIf],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  isLoggedIn: boolean = !!localStorage.getItem('access'); 

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
