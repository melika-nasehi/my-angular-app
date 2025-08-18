import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { App } from './app';
import { Home } from './home/home';
import { Login } from './pages/login/login';
import { AdminPanel } from './admin-panel/admin-panel';

export const routes: Routes = [
    { path : 'login', component:Login, pathMatch:'full'},
    { path: 'home', component: Home, pathMatch: 'full'},
    { path: 'admin_panel', component: AdminPanel, pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: '**', redirectTo: '/login' ,pathMatch:'prefix'},
    { path: '', redirectTo:'/login', pathMatch:'prefix'}
];

