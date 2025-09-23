import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';
  captcha:string ='' ;
  captcha_url = "http://localhost:8000/api/users/captcha/"

  constructor(private auth: AuthService) {}

  onSubmit() {
    this.auth.login(this.username, this.password, this.captcha);
  }
}
