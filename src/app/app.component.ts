import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'simple-crm';
  isMobileView: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.checkScreenSize();
  }

  checkIfEntryRoutes(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.includes('/login') || currentRoute.includes('/register') ||
      currentRoute.includes('/varify-email') || currentRoute.includes('/forgot-password');
  }

  logout() {
    this.auth.logout();
    localStorage.removeItem('name');
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 768;
  }
}


