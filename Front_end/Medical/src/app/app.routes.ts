import { Routes } from '@angular/router';
import { HomeAdmistionComponent } from './home-admistion/home-admistion.component';
import { SearchReportComponent } from './search-report/search-report.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { NurseDutyComponent } from './nurse-duty/nurse-duty.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PersonDetailsComponent } from './person-details/person-details.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MainHomeComponent } from './main-home/main-home.component';

export const routes: Routes = [

    {path:'', redirectTo:'login', pathMatch:'full'},

    {path:'',component:LoginComponent,title:'login'},
    {path:'dashboard',component:MainHomeComponent,title:'dashboard'},
    {path:'homeadmision',component:HomeAdmistionComponent,title:'homeadmision'},
    {path:'search&report',component:SearchReportComponent,title:'search&report'},
    {path:'notification',component:NotificationComponent,title:'notification'},
    {path:'dropdown',component:DropdownComponent,title:'dropdown'},
    {path:'nurseduty',component:NurseDutyComponent,title:'nurseduty'},
    {path:'userDetails',component:UserDetailsComponent,title:'user details'},
    {path:'person',component:PersonDetailsComponent,title:'person'},
    {path:'settings',component:SettingsComponent,title:'settings'},
    {path:'change-password',component:ChangePasswordComponent,title:'changepassword'},


    


];
