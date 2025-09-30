import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { App } from './app';
import { Home } from './home/home';
import { Login } from './pages/login/login';
import { AdminPanel } from './admin-panel/admin-panel';
import { ProjectSideMenu } from './project/project-side-menu/project-side-menu';

export const routes: Routes = [
    { path : 'login', component:Login, pathMatch:'full'},
    { path: 'admin_panel', component: AdminPanel, pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard ,pathMatch: "full"},
    { path: 'home', component: Home, pathMatch: 'full'},
    { path: 'side-menu-projects', component: ProjectSideMenu, pathMatch: 'full'},
    { path: '', redirectTo:'/login', pathMatch:'full'} ,     //http://localhost:4200/
    { path: '**', redirectTo: '/login' ,pathMatch:'full'},  //http://localhost:4200/****** */
];

