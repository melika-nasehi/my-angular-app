import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { App } from './app';
import { Home } from './home/home';

export const routes: Routes = [
    { path: 'home', component: Home, pathMatch: 'full'},
    { path: 'app', component: App, pathMatch: 'full'},
    { path: 'dashboard', component: Dashboard },
    { path: '**', redirectTo: '' }
];

