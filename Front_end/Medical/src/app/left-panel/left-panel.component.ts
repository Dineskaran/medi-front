import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import{MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { UserDetailsService } from '../services/user-details.service';


@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink,MatButtonModule, MatTooltipModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
  mainService: MainService = inject(MainService);
  __user:UserDetailsService=inject(UserDetailsService);
  showSubmenu = false;

  toggleDropdown() {
    this.showSubmenu = !this.showSubmenu;
  }
  isSidebarOpen = false;
  isDarkMode = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}
