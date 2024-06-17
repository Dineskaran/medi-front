import { Component } from '@angular/core';
import { PersonDetailsComponent } from '../person-details/person-details.component';
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
    imports: [PersonDetailsComponent, UserDetailsComponent]
})
export class SettingsComponent {

}
