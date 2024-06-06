import { Component } from '@angular/core';
import { HomeAdmistionComponent } from '../home-admistion/home-admistion.component';


@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [HomeAdmistionComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {

}
