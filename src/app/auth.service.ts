import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Api } from './services/api';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

interface User {
  id: string;
  user_id:string,
  username: string;
  token: string;
  role: string;
  profile_image?: string;
  bio?: string;
  skills?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = new BehaviorSubject<User | null>(null);

  constructor(private api: Api, private router: Router) {
    const token = localStorage.getItem('access');
    if (token) {
      this.loadUserProfile();
    }
  }

  login(username: string, password: string, captcha:string): void {
    this.api.login(username, password, captcha).subscribe({
      next: res => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.loadUserProfile();
        this.router.navigate(['/home']);
      },
      error: err => {
        console.error('Login error in service:', err);
      }
    });
  }

  loadUserProfile() {
    this.api.getUserProfile().subscribe({
      next: (response) => {
        const profile = response.results?.[0] || {};
        const user: User = {
          id: profile.id || 'unknown',
          user_id : profile.user_id || 'null',
          username: profile.username || 'Guest',
          token: localStorage.getItem('access') || '',
          role: profile.role || 'user',
          profile_image: profile.profile_image,
          bio: profile.bio,
          skills: profile.skills
        };
        this.currentUser.next(user);
        console.log('User profile loaded:', user);
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.logout();
      }
    });
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.currentUser.next(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('access');
  }

  

  checkIsAdmin(): Observable<boolean> {
    return this.api.getUsers().pipe(   
      map(() => true),                 
      catchError(() => of(false))  
    );
  }
  
}
