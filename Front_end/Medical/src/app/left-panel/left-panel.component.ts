import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainService } from '../services/main.service';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterLink],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent {
  mainService: MainService = inject(MainService);

}
