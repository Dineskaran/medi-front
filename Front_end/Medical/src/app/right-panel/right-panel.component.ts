import { Component } from '@angular/core';
import { HomeAdmistionComponent } from '../home-admistion/home-admistion.component';
import { HomeComponent } from '../home/home.component';
import { NurseDutyComponent } from '../nurse-duty/nurse-duty.component';
import { NotificationComponent } from '../notification/notification.component';
import { SettingsComponent } from '../settings/settings.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-right-panel',
  standalone: true,
  imports: [RouterModule,RouterLink,RouterLink,HomeAdmistionComponent,HomeComponent,SettingsComponent,NurseDutyComponent,NotificationComponent],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {

}
