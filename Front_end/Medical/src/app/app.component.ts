import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MainService } from './services/main.service';
import { filter } from 'rxjs/operators';
import { UserDetailsService } from './services/user-details.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, CommonModule, LeftPanelComponent]
})
export class AppComponent implements OnInit {
  title = 'Medical';
  __main: MainService = inject(MainService);
  __user: UserDetailsService = inject(UserDetailsService);

  isLoggedIn: boolean = false;
  private router = inject(Router);

  constructor() {
    // if (!window.onbeforeunload) {
    //   window.onbeforeunload = (e) => {
    //     e.preventDefault();
    //     return true;
    //   };
    // }
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event) => {
    //   const navEndEvent = event as NavigationEnd;
    //   if (!this.__user.isLogined && navEndEvent.url !== '/login') {
    //     this.router.navigate(['/login']);
    //   }
    // });

    // if (!window.onbeforeunload) {
    //   window.onbeforeunload = (e) => {
    //     e.preventDefault();
    //     return true;
    //   };
    // }
  }

  showSidebar() {
    return this.isLoggedIn && this.router.url !== '/login'; // Show sidebar only if logged in and not on login page
  }
}
