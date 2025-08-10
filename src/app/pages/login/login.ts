import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private api:Api) {}

   onSubmit() {
    this.api.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        window.location.reload();
      },
      error: () => {
        alert('نام کاربری یا رمز عبور اشتباه است');
      }
    });
  }

}
