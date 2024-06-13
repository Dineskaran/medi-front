import { Component } from '@angular/core';
import { PersonDetailsComponent } from '../person-details/person-details.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [PersonDetailsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

}
