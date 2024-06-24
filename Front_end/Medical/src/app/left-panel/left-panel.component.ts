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
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
