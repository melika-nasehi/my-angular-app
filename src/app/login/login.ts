import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';   // اضافه کن



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  userId: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}  // Router اضافه شد

  //  onLogin() {
  //   if (this.authService.login(this.userId)) {
  //     this.errorMessage = '';
  //     this.router.navigate(['/']);   // بعد از ورود موفق به صفحه اصلی می‌رویم
  //   } else {
  //     this.errorMessage = 'کاربر یافت نشد!';
  //   }
  // }

}





