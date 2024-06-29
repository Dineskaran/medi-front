import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from "./login/login.component";
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from "./left-panel/left-panel.component";
import { MainService } from './services/main.service';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, HomeComponent, LoginComponent, CommonModule, LeftPanelComponent]
})
export class AppComponent {
  title = 'Medical';
  __main:MainService=inject(MainService)


  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    if (!window.onbeforeunload) {
		  window.onbeforeunload = (e) => {
        e.preventDefault()
			  return true;
	      };
	  }
  }

  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';




  }

  showSidebar() {
    return this.isLoggedIn && this.router.url !== '/'; // Show sidebar only if logged in and not on login page
  }
}

