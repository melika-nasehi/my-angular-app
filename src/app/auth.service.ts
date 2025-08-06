import { Injectable } from '@angular/core';
import { user_interface } from './user/user.model';
import { DUMMY_USERS } from './dummy-users';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser?: user_interface;

//   login(userId: string): boolean {
//     const user = DUMMY_USERS.find(u => u.id === userId);
//     if (user) {
//       this.currentUser = user;
//       return true;
//     }
//     return false;
//   }

  logout(): void {
    this.currentUser = undefined;
  }

  getCurrentUser(): user_interface | undefined {
    return this.currentUser;
  }

//   isAdmin(): boolean {
//     return this.currentUser?.user_name === 'admin'; // فرض می‌کنیم نقش admin اینطوری مشخص شده
//   }
}
