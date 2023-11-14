import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'simple-crm';

  constructor(private router: Router, private auth: AuthService) { }

  checkIfEntryRoutes(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register') ||
      currentRoute.includes('/varify-email') || currentRoute.includes('/forgot-password');
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('name');
  }
}

