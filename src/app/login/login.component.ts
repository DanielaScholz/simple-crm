import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) { }


  login() {
    if (this.email = '') {
      alert('Please enter email');
      return
    }

    if (this.password = '') {
      alert('Please enter password');
      return
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';

  }

}
