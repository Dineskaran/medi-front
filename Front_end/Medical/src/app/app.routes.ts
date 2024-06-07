import { Routes } from '@angular/router';
import { HomeAdmistionComponent } from './home-admistion/home-admistion.component';
import { SearchReportComponent } from './search-report/search-report.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NurseDutyComponent } from './nurse-duty/nurse-duty.component';

export const routes: Routes = [

    // {path:'',component:HomeComponent,title:'home'},
    {path:'homeadmision',component:HomeAdmistionComponent,title:'homeadmision'},
    {path:'search&report',component:SearchReportComponent,title:'search&report'},
    {path:'notification',component:NotificationComponent,title:'notification'},
    {path:'settings',component:SettingsComponent,title:'settings'},
    {path:'nurseduty',component:NurseDutyComponent,title:'nurseduty'},
    

    

];
